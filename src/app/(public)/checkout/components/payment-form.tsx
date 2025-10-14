import { zodResolver } from "@hookform/resolvers/zod";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/blocks/dropdown-menu";
import { useApiContext } from "@/context/ApiContext";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import {
  maskCard,
  maskCep,
  maskCpfCnpj,
  maskExpiryDate,
  maskPhone,
} from "@/utils/masks";
import {
  CheckCheck,
  ChevronDown,
  Loader2,
  MapPin,
  MapPinHouse,
  TicketPercent,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../login/components/form";
import Icon from "../../login/components/icon";
import { PlanProps } from "../page";

// ——————————————————————————————————————————————————————————
// ⚙️ TIPOS
// ——————————————————————————————————————————————————————————
type FormProps = {
  plans: PlanProps[];
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  discountPercent: number | null;
  setDiscountPercent: React.Dispatch<React.SetStateAction<number | null>>;
  couponApplied: boolean;
  setCouponApplied: React.Dispatch<React.SetStateAction<boolean>>;
  couponLoading: boolean;
  setCouponLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreditCardSchema = z.object({
  holderName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  number: z.string().min(14, "Cartão deve ter pelo menos 14 caracteres"),
  expiryDate: z.string().min(5, "Data Inválida"),
  ccv: z.string().min(3, "CVV Inválido"),
});

const CreditCardHolderSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email({ message: "Email Inválido" }),
  cpfCnpj: z.string().min(11, "CPF/CNPJ deve ter pelo menos 11 caracteres"),
  postalCode: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
  addressNumber: z.string().min(1, "Endereço deve ter pelo menos 1 caracteres"),
  phone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
});

const FormSchema = z.object({
  ...CreditCardSchema.shape,
  ...CreditCardHolderSchema.shape,
});

// ——————————————————————————————————————————————————————————
// 💳 COMPONENTE
// ——————————————————————————————————————————————————————————
const PaymentForm = ({
  plans,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  couponCode,
  setCouponCode,
  discountPercent,
  setDiscountPercent,
  couponApplied,
  setCouponApplied,
  couponLoading,
  setCouponLoading,
}: FormProps) => {
  const router = useRouter();
  const { PostAPI, GetAPI } = useApiContext();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [isPaying, setIsPaying] = useState(false);
  const [isPixBeingGenerated, setIsPixBeingGenerated] = useState(false);
  const [isPixGenerated, setIsPixGenerated] = useState(false);
  const [copiedQrCode, setCopiedQrCode] = useState(false);
  const [qrCode, setQrCode] = useState({ encodedImage: "", payload: "" });
  const [buttonText, setButtonText] = useState("Aguardando Pagamento");

  // ——— NOVO: alternância mensal/anual ———
  const [isYearly, setIsYearly] = useState(false);

  // ——— CUPOM (sempre percentual) ———
  // ex.: 10 => 10%

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      holderName: "",
      number: "",
      expiryDate: "",
      ccv: "",
      name: "",
      email: "",
      cpfCnpj: "",
      postalCode: "",
      addressNumber: "",
      phone: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);
    const stepFields = {
      0: ["holderName", "number", "expiryDate", "ccv"] as const,
      1: ["name", "email", "cpfCnpj"] as const,
      2: ["postalCode", "addressNumber", "phone"] as const,
    };
    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };
    return { activeStep, validateStep, setActiveStep };
  };
  const { validateStep } = useFormSteps(form);

  // ——— helpers ———
  const formatBRL = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const round2 = (n: number) => Number(n.toFixed(2));

  // ————————————————————————————————————————
  // 💰 Precificação (agora: API retorna valores MENSAIS)
  //     Anual = mensal * 12 - desconto anual (yearlyDiscount%)
  //     Cupom sempre percentual e aplicado por último.
  // ————————————————————————————————————————
  const cardMonthly = plans[0]?.creditCardPrice ?? 0; // valor mensal
  const pixMonthly = plans[0]?.pixPrice ?? 0; // valor mensal
  const yearlyDiscountPct = Math.max(
    0,
    Math.min(100, plans[0]?.yearlyDiscount ?? 0),
  );
  const yearlyFactor = isYearly ? 1 - yearlyDiscountPct / 100 : 1;

  // Totais ANTES do cupom (já com yearly quando aplicável)
  const cardBaseTotal = round2(
    (isYearly ? cardMonthly * 12 : cardMonthly) * yearlyFactor,
  );
  const pixBaseTotal = round2(
    (isYearly ? pixMonthly * 12 : pixMonthly) * yearlyFactor,
  );
  const isCard = selectedPaymentMethod === "card";
  const yearlyDiscount =
    isYearly && isCard
      ? cardMonthly * 12 * (yearlyDiscountPct / 100)
      : pixMonthly * 12 * (yearlyDiscountPct / 100);
  // Cupom (aplicado por último)
  const couponFactor = discountPercent
    ? Math.max(0, 1 - discountPercent / 100)
    : 1;
  const cardFinalTotal = round2(
    cardBaseTotal * (couponApplied ? couponFactor : 1),
  );
  const pixFinalTotal = round2(
    pixBaseTotal * (couponApplied ? couponFactor : 1),
  );

  // UI auxiliares
  const baseTotalSelected = isCard ? cardBaseTotal : pixBaseTotal;
  const finalTotalSelected = isCard ? cardFinalTotal : pixFinalTotal;
  const couponSavedSelected = Math.max(
    0,
    round2(baseTotalSelected - finalTotalSelected),
  );

  // Badge de desconto do Pix (diferença entre métodos, antes do cupom)
  const pixBadgeDiff = round2(
    (cardMonthly - pixMonthly) * (isYearly ? 12 : 1) * yearlyFactor,
  );

  // Para o dropdown de parcelas (usa o TOTAL efetivo do cartão, com cupom/ano quando houver)
  const effectiveCardTotal = cardFinalTotal;

  // ——— validação do cupom ———
  const handleValidateCoupon = async () => {
    const code = couponCode.trim();
    if (!code) {
      toast.error("Informe um cupom.");
      return;
    }
    try {
      setCouponLoading(true);
      const resp = await GetAPI(`/partner/${encodeURIComponent(code)}`, true);
      if (resp?.status === 200 && typeof resp.body?.discount === "number") {
        const pct = Number(resp.body.discount);
        if (!Number.isFinite(pct) || pct <= 0) {
          setDiscountPercent(null);
          setCouponApplied(false);
          toast.error("Cupom encontrado, mas sem desconto válido.");
          return;
        }
        setDiscountPercent(pct);
        setCouponApplied(true);
        toast.success(`Cupom aplicado: ${pct}% de desconto!`);
      } else {
        setDiscountPercent(null);
        setCouponApplied(false);
        toast.error("Cupom inválido.");
      }
    } catch {
      setDiscountPercent(null);
      setCouponApplied(false);
      toast.error("Erro ao validar cupom.");
    } finally {
      setCouponLoading(false);
    }
  };

  // se o usuário alterar o texto do cupom depois de aplicado, “desaplica” visualmente
  useEffect(() => {
    setCouponApplied(false);
    // mantém o percent para não “piscar” o valor; ao reaplicar, volta a marcar como aplicado
  }, [couponCode]);

  const handleNext = async (
    form: UseFormReturn<z.infer<typeof FormSchema>>,
  ) => {
    router.push("/");
    // if (currentStep === 0) {
    //   const isValid = await validateStep(currentStep);
    //   if (!isValid) {
    //     const errors = form.formState.errors;
    //     const fieldLabels: Record<
    //       keyof z.infer<typeof CreditCardSchema>,
    //       string
    //     > = {
    //       holderName: "Nome",
    //       number: "Cartão",
    //       expiryDate: "Data",
    //       ccv: "CVV",
    //     };
    //     const firstErrorField = Object.keys(
    //       errors,
    //     )[0] as keyof typeof fieldLabels;
    //     const firstError = errors[firstErrorField];
    //     if (firstError?.message && firstErrorField in fieldLabels) {
    //       const fieldLabel = fieldLabels[firstErrorField];
    //       return toast.error(`${fieldLabel}: ${firstError.message}`);
    //     }
    //     return toast.error("Por favor, corrija os erros no formulário.");
    //   } else {
    //     setCurrentStep(currentStep + 1);
    //   }
    // } else if (currentStep === 1 || currentStep === 2) {
    //   const isValid = await validateStep(currentStep);
    //   if (!isValid) {
    //     const errors = form.formState.errors;
    //     const fieldLabels: Record<
    //       keyof z.infer<typeof CreditCardHolderSchema>,
    //       string
    //     > = {
    //       name: "Nome",
    //       email: "Email",
    //       cpfCnpj: "CPF/CNPJ",
    //       postalCode: "CEP",
    //       addressNumber: "Endereço",
    //       phone: "Telefone",
    //     };
    //     const secondErrorField = Object.keys(
    //       errors,
    //     )[0] as keyof typeof fieldLabels;
    //     const secondError = errors[secondErrorField];
    //     if (secondError?.message && secondErrorField in fieldLabels) {
    //       const fieldLabel = fieldLabels[secondErrorField];
    //       return toast.error(`${fieldLabel}: ${secondError.message}`);
    //     }
    //     return toast.error("Por favor, corrija os erros no formulário.");
    //   } else {
    //     setCurrentStep(currentStep + 1);
    //   }
    // } else if (currentStep === 3) {
    //   setIsPaying(true);

    //   const body: any = {
    //     planId: plans[0].id,
    //     yearly: isYearly,
    //     creditCard: {
    //       holderName: form.getValues("holderName"),
    //       number: form.getValues("number"),
    //       expiryMonth: form.getValues("expiryDate").split("/")[0],
    //       expiryYear: form.getValues("expiryDate").split("/")[1],
    //       ccv: form.getValues("ccv"),
    //     },
    //     creditCardHolderInfo: {
    //       name: form.getValues("name"),
    //       email: form.getValues("email"),
    //       cpfCnpj: form.getValues("cpfCnpj"),
    //       postalCode: form.getValues("postalCode"),
    //       addressNumber: form.getValues("addressNumber"),
    //       phone: form.getValues("phone"),
    //     },
    //     installmentCount: selectedInstallment,
    //   };

    //   if (couponApplied && couponCode.trim()) {
    //     body.partnerCode = couponCode.trim();
    //   }

    //   const creditPayment = await PostAPI("/signature/credit/new", body, true);

    //   if (creditPayment.status === 200) {
    //     toast.success("Pagamento realizado com sucesso!");
    //     router.push("/thanks");
    //     return setIsPaying(false);
    //   }
    //   toast.error("Houve um erro ao realizar o pagamento.");
    //   return setIsPaying(false);
    // }
  };

  async function HandleQrCode() {
    setIsPixBeingGenerated(true);

    const payload: any = { yearly: isYearly }; // ← NOVO
    if (couponApplied && couponCode.trim()) {
      payload.partnerCode = couponCode.trim();
    }

    const qrResp = await PostAPI(
      `/signature/pix/${plans[0]?.id}`,
      payload,
      true,
    );
    if (qrResp.status === 200) {
      setQrCode(qrResp.body.payment);
      setIsPixGenerated(true);
      return setIsPixBeingGenerated(false);
    }
    alert(qrResp.body.message);
    return setIsPixBeingGenerated(false);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  useEffect(() => {
    if (copiedQrCode) {
      const timer = setTimeout(
        () => setButtonText("Confirmar Pagamento"),
        5000,
      );
      return () => clearTimeout(timer);
    } else {
      setButtonText("Aguardando Pagamento");
    }
  }, [copiedQrCode]);

  return (
    <Form {...form}>
      {/* ———————————————————————————————————————— */}
      {/* NOVO: Switch Mensal/Anual */}
      {/* ———————————————————————————————————————— */}
      <div className="mb-4 flex w-full items-center justify-center">
        <div
          role="tablist"
          aria-label="Alternar período de cobrança"
          className={cn(
            "relative flex w-full max-w-[320px] rounded-md bg-stone-800 p-1 before:absolute before:top-1 before:bottom-1 before:left-1 before:w-[calc(50%-0.25rem)] before:rounded-md before:bg-stone-700 before:transition-transform before:duration-300 before:ease-out",
            isYearly && "before:translate-x-full",
          )}
        >
          {/* Mensal */}
          <button
            type="button"
            role="tab"
            aria-selected={!isYearly}
            onClick={() => setIsYearly(false)}
            className={cn(
              "group relative z-[1] inline-flex h-10 basis-1/2 items-center justify-center gap-2 rounded-md px-3 text-base font-semibold transition-colors focus:outline-none md:text-lg",
              !isYearly && "text-n-3",
            )}
          >
            <Icon
              aria-hidden
              name="calendar"
              className={cn(
                "h-5 w-5 transition-colors",
                !isYearly ? "fill-primary" : "fill-neutral-500",
              )}
            />
            Mensal
          </button>

          {/* Anual */}
          <button
            type="button"
            role="tab"
            aria-selected={isYearly}
            onClick={() => setIsYearly(true)}
            className={cn(
              "group relative z-[1] inline-flex h-10 basis-1/2 items-center justify-center gap-2 rounded-md px-3 text-base font-semibold transition-colors focus:outline-none md:text-lg",
              isYearly && "text-n-3",
            )}
          >
            <Icon
              aria-hidden
              name="trophy"
              className={cn(
                "h-5 w-5 transition-colors",
                isYearly ? "fill-primary" : "fill-neutral-500",
              )}
            />
            Anual
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-auto text-neutral-600">Forma de Pagamento</div>
      </div>

      <div className="flex h-20 w-full items-center justify-between gap-2 py-2 xl:h-32 xl:gap-8 xl:py-4">
        <input
          type="radio"
          name="payment-method"
          id="card"
          className="hidden"
          checked={selectedPaymentMethod === "card"}
          onChange={() => setSelectedPaymentMethod("card")}
        />
        <label
          htmlFor="card"
          className={cn(
            "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md",
            selectedPaymentMethod === "card"
              ? "border-primary border-2"
              : "border border-neutral-500",
          )}
        >
          <div className="mb-1 flex items-center gap-1">
            <div className="text-sm text-neutral-600">Cartão</div>
            <Icon
              className={cn(
                "fill-primary ml-auto opacity-0 transition duration-200",
                selectedPaymentMethod === "card" && "opacity-100",
              )}
              name="check-thin"
            />
          </div>
          <div className="flex items-center">
            <div className="font-semibold">Dados do Cartão</div>
          </div>
        </label>

        <input
          type="radio"
          name="payment-method"
          id="pix"
          className="hidden"
          checked={selectedPaymentMethod === "pix"}
          onChange={() => setSelectedPaymentMethod("pix")}
        />
        <label
          htmlFor="pix"
          className={cn(
            "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md",
            selectedPaymentMethod === "pix"
              ? "border-primary border-2"
              : "border border-neutral-500",
          )}
        >
          <div className="mb-1 flex items-center gap-1">
            <div className="text-sm text-neutral-600">Pix</div>
            <Icon
              className={cn(
                "fill-primary ml-auto opacity-0 transition duration-200",
                selectedPaymentMethod === "pix" && "opacity-100",
              )}
              name="check-thin"
            />
          </div>
          <div className="flex items-center">
            <div className="mr-2 hidden font-semibold xl:block">Desconto</div>
            <div className="from-primary to-secondary ml-auto rounded bg-gradient-to-br bg-clip-text px-2 font-bold text-transparent">
              - {formatBRL(pixBadgeDiff)}
            </div>
          </div>
        </label>
      </div>

      {selectedPaymentMethod === "card" ? (
        <div className="relative h-60" onKeyDown={handleKeyPress}>
          {currentStep === 0 ? (
            <div className="mb-3 rounded-md border border-neutral-500 pb-4">
              <div className="p-5">
                <div className="relative">
                  <FormField
                    key="holderName"
                    name="holderName"
                    control={form.control}
                    render={({ field }) => (
                      <div className="group">
                        <FormLabel
                          className={cn(
                            "group-focus-within:text-primary mb-3 transition duration-200",
                            field.value && "text-primary",
                          )}
                        >
                          Nome no Cartão
                        </FormLabel>
                        <FormItem className="relative">
                          <Image
                            src="/icons/credit-card.svg"
                            alt=""
                            width={100}
                            height={100}
                            className="pointer-events-none absolute top-1/2 left-0 h-4 w-max -translate-y-1/2 object-contain"
                          />
                          <input
                            className={cn(
                              "group-focus-within:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none group-focus-within:border-b placeholder:text-neutral-600",
                              field.value &&
                                "border-b-primary dark:border-b-primary",
                            )}
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Nome no cartão..."
                            required
                          />
                        </FormItem>
                        <FormMessage className="font-base absolute inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="border-t border-neutral-500 p-5">
                <div className="flex md:flex-wrap">
                  <FormField
                    key="number"
                    name="number"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="group">
                          <FormLabel
                            className={cn(
                              "base2 text-n-5 group-focus-within:text-primary mb-3 transition duration-200 dark:group-focus-within:text-white",
                              field.value && "text-primary dark:text-white",
                            )}
                          >
                            Número do Cartão
                          </FormLabel>
                          <div className="relative grow md:mb-4 md:w-full">
                            <Image
                              src="/icons/credit-card.svg"
                              alt=""
                              width={100}
                              height={100}
                              className="pointer-events-none absolute top-1/2 left-0 h-4 w-max -translate-y-1/2 object-contain"
                            />
                            <input
                              className={cn(
                                "group-focus-within:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none group-focus-within:border-b placeholder:text-neutral-600",
                                field.value &&
                                  "border-b-primary dark:border-b-primary",
                              )}
                              value={maskCard(field.value)}
                              onChange={(e) => field.onChange(e.target.value)}
                              maxLength={19}
                              type="tel"
                              placeholder="0000-0000-0000-0000"
                              required
                            />
                          </div>
                          <FormMessage className="font-base absolute mt-2 inline-flex h-[22px] w-52 items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    key="expiryDate"
                    name="expiryDate"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="group">
                          <FormLabel
                            className={cn(
                              "base2 text-n-5 group-focus-within:text-primary mb-3 transition duration-200 dark:group-focus-within:text-white",
                              field.value && "text-primary dark:text-white",
                            )}
                          >
                            Validade
                          </FormLabel>

                          <div className="mx-8 w-20 shrink-0 md:mr-auto md:ml-0">
                            <input
                              className={cn(
                                "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                field.value &&
                                  "border-b-primary dark:border-b-primary",
                              )}
                              placeholder="00/00"
                              type="tel"
                              maxLength={5}
                              value={maskExpiryDate(field.value)}
                              onChange={(e) => field.onChange(e.target.value)}
                              required
                            />
                          </div>
                          <FormMessage className="font-base absolute inline-flex h-[22px] w-32 -translate-x-12 items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    key="ccv"
                    name="ccv"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="group">
                          <FormLabel
                            className={cn(
                              "base2 text-n-5 group-focus-within:text-primary mb-3 transition duration-200 dark:group-focus-within:text-white",
                              field.value && "text-primary dark:text-white",
                            )}
                          >
                            CVV
                          </FormLabel>

                          <div className="w-10 shrink-0">
                            <input
                              className={cn(
                                "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                field.value &&
                                  "border-b-primary dark:border-b-primary",
                              )}
                              placeholder="000"
                              type="tel"
                              value={field.value}
                              onChange={field.onChange}
                              maxLength={4}
                              required
                            />
                          </div>
                          <FormMessage className="font-base absolute inline-flex h-[22px] w-32 -translate-x-12 items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 1 ? (
            <>
              <div className="mb-3 rounded-md border border-neutral-500 pb-4">
                <div className="p-5">
                  <div className="relative">
                    <FormField
                      key="name"
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <div className="group">
                          <FormLabel
                            className={cn(
                              "group-focus-within:text-primary mb-3 transition duration-200",
                              field.value && "text-primary",
                            )}
                          >
                            Nome Completo
                          </FormLabel>
                          <FormItem className="relative">
                            <Image
                              src="/icons/placeholder.svg"
                              alt=""
                              width={100}
                              height={100}
                              className="pointer-events-none absolute top-1/2 left-0 h-4 w-max -translate-y-1/2 object-contain"
                            />
                            <input
                              className={cn(
                                "group-focus-within:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none group-focus-within:border-b placeholder:text-neutral-600",
                                field.value && "border-b-primary",
                              )}
                              type="text"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Nome"
                              required
                            />
                          </FormItem>
                          <FormMessage className="font-base absolute inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="flex border-t border-neutral-500 p-5">
                  <div className="flex flex-col">
                    <div className="flex md:flex-wrap">
                      <FormField
                        key="email"
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <div className="group">
                            <FormLabel
                              className={cn(
                                "group-focus-within:text-primary mb-3 transition duration-200",
                                field.value && "text-primary",
                              )}
                            >
                              Email
                            </FormLabel>
                            <FormItem className="relative">
                              <div className="relative grow md:mb-4 md:w-full">
                                <Icon
                                  className="pointer-events-none absolute top-0 left-0 h-5 fill-neutral-500"
                                  name="email"
                                />
                                <input
                                  className={cn(
                                    "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                    field.value &&
                                      "border-b-primary dark:border-b-primary",
                                  )}
                                  type="email"
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="Email"
                                  required
                                />
                              </div>
                              <FormMessage className="font-base absolute inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex md:flex-wrap">
                      <FormField
                        key="cpfCnpj"
                        name="cpfCnpj"
                        control={form.control}
                        render={({ field }) => (
                          <div className="group">
                            <FormLabel
                              className={cn(
                                "group-focus-within:text-primary mb-3 transition duration-200",
                                field.value && "text-primary",
                              )}
                            >
                              CPF / CNPJ
                            </FormLabel>
                            <FormItem className="relative">
                              <div className="mx-8 w-40 shrink-0 md:mr-0 md:ml-8">
                                <input
                                  className={cn(
                                    "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                    field.value &&
                                      "border-b-primary dark:border-b-primary",
                                  )}
                                  type="tel"
                                  maxLength={18}
                                  value={maskCpfCnpj(field.value)}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  placeholder="CPF / CNPJ"
                                  required
                                />
                              </div>
                              <FormMessage className="font-base absolute inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : currentStep === 2 ? (
            <>
              <div className="mb-3 rounded-md border border-neutral-500 pb-4">
                <div className="p-5">
                  <div className="relative">
                    <FormField
                      key="postalCode"
                      name="postalCode"
                      control={form.control}
                      render={({ field }) => (
                        <div className="group">
                          <FormLabel
                            className={cn(
                              "group-focus-within:text-primary mb-3 transition duration-200",
                              field.value && "text-primary",
                            )}
                          >
                            CEP
                          </FormLabel>
                          <FormItem className="relative">
                            <MapPin className="pointer-events-none absolute top-0 left-0 h-5 w-max object-contain text-neutral-500" />
                            <input
                              className={cn(
                                "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                field.value && "border-b-primary",
                              )}
                              type="tel"
                              maxLength={9}
                              value={maskCep(field.value)}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="CEP"
                              required
                            />
                          </FormItem>
                          <FormMessage className="font-base absolute inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="flex border-t border-neutral-500 p-5">
                  <div className="flex flex-col">
                    <div className="flex md:flex-wrap">
                      <FormField
                        key="addressNumber"
                        name="addressNumber"
                        control={form.control}
                        render={({ field }) => (
                          <div className="group">
                            <FormLabel
                              className={cn(
                                "group-focus-within:text-primary mb-3 transition duration-200",
                                field.value && "text-primary",
                              )}
                            >
                              Número
                            </FormLabel>
                            <FormItem className="relative">
                              <div className="relative grow md:mb-4 md:w-full">
                                <MapPinHouse className="pointer-events-none absolute top-0 left-0 h-5 w-max text-neutral-500" />
                                <input
                                  className={cn(
                                    "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-11 font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                    field.value && "border-b-primary",
                                  )}
                                  type="text"
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="Número"
                                  required
                                />
                              </div>
                              <FormMessage className="font-base absolute inline-flex h-[22px] w-40 items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex md:flex-wrap">
                      <FormField
                        key="phone"
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                          <div className="group">
                            <FormLabel
                              className={cn(
                                "group-focus-within:text-primary mb-3 transition duration-200",
                                field.value && "text-primary",
                              )}
                            >
                              Telefone
                            </FormLabel>
                            <FormItem className="relative">
                              <div className="mx-8 w-40 shrink-0 md:mr-0 md:ml-8">
                                <input
                                  className={cn(
                                    "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                                    field.value && "border-b-primary",
                                  )}
                                  type="tel"
                                  value={maskPhone(field.value)}
                                  maxLength={15}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  placeholder="Telefone"
                                  required
                                />
                              </div>
                              <FormMessage className="font-base absolute inline-flex h-[22px] w-40 translate-x-10 items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mb-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={!isYearly}>
                  <button
                    disabled={!isYearly}
                    className="from-primary to-secondary relative col-span-12 w-full rounded-md border border-neutral-500 bg-gradient-to-br bg-clip-text p-2 font-bold text-transparent"
                  >
                    <span>
                      {selectedInstallment +
                        " x " +
                        formatBRL(effectiveCardTotal / selectedInstallment)}
                    </span>
                    <ChevronDown className="absolute top-1/2 right-2 -translate-y-1/2" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-primary bg-stone-900">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <DropdownMenuItem
                      className={cn(
                        "hover:bg-primary cursor-pointer font-bold text-white transition",
                        selectedInstallment === item && "bg-primary text-white",
                      )}
                      onSelect={() => setSelectedInstallment(item)}
                      key={item}
                    >
                      <span>
                        {item + " x " + formatBRL(effectiveCardTotal / item)}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-60 flex-col gap-2">
          <button
            onClick={HandleQrCode}
            className="bg-primary mx-auto flex h-12 w-full items-center gap-2 rounded-lg p-2 font-semibold text-white transition-all duration-300"
          >
            {isPixBeingGenerated ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : isPixGenerated ? (
              <span className="mx-auto">Pix Gerado!</span>
            ) : (
              <>
                <Image
                  src="/icons/pix.png"
                  alt=""
                  width={200}
                  height={200}
                  className="h-max w-10 object-contain"
                />
                <span>Clique aqui para Gerar o QR Code</span>
              </>
            )}
          </button>
          <>
            {isPixGenerated && (
              <div className="flex items-center justify-between gap-4">
                <Image
                  src={`data:img/png;base64, ${qrCode.encodedImage}`}
                  width={300}
                  height={300}
                  alt=""
                  className="bg-primary mx-auto h-max w-1/3 self-center rounded-2xl object-contain p-2"
                />
                <button
                  className="bg-primary m-auto flex w-40 items-center gap-2 rounded-lg p-1 text-sm text-white transition-all duration-300"
                  onClick={() => {
                    copyToClipboard(qrCode.payload);
                    setCopiedQrCode(true);
                  }}
                >
                  <span className={`${copiedQrCode && "italic"}`}>
                    {copiedQrCode
                      ? "Link copiado com sucesso!"
                      : "Clique aqui para Copiar"}
                  </span>
                  <CheckCheck />
                </button>
              </div>
            )}
          </>
        </div>
      )}

      <div className="flex flex-col">
        <div className="caption1 text-n-4/50 mb-6 flex items-center xl:hidden">
          <Icon className="mr-2 h-4 w-4 fill-neutral-500" name="lock" />
          Garantia de Segurança com Banco Central
        </div>

        {/* Cupom ao lado do resumo de preço */}
        <div className="mb-4 flex flex-col gap-2 xl:hidden">
          <div className="border-n-3 dark:border-n-5 flex items-center gap-3 rounded-xl border p-4">
            <div className="relative flex-1">
              <TicketPercent className="text-primary pointer-events-none absolute top-0 left-0 h-5 w-max" />
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Cupom de desconto"
                className={cn(
                  "focus:border-b-primary h-6 w-full border-b border-b-transparent bg-transparent pl-8 font-light transition duration-200 outline-none placeholder:text-neutral-600 focus:border-b",
                  couponCode && "border-b-primary dark:border-b-primary",
                )}
              />
            </div>
            <button
              onClick={handleValidateCoupon}
              type="button"
              className={cn(
                "bg-primary flex h-10 items-center justify-center gap-2 rounded-lg px-4 font-semibold text-white",
                couponLoading && "opacity-80",
              )}
              disabled={couponLoading}
            >
              {couponLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Aplicar"
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="h4 flex flex-wrap items-center justify-end gap-2">
            <span>Preço Final:</span>
            {couponApplied && discountPercent != null ? (
              <>
                <span className="text-n-4/60 line-through">
                  {formatBRL(baseTotalSelected)}
                </span>
                <span>{formatBRL(finalTotalSelected)}</span>
              </>
            ) : (
              <span>{formatBRL(baseTotalSelected)}</span>
            )}
          </div>

          <button
            className="base2 text-secondary-1 hover:text-secondary-1/90 mb-4 font-semibold transition-colors"
            type="button"
          >
            / Por {isYearly ? "Ano" : "Mês"}
          </button>
          {isYearly && (
            <div className="caption1 mb-1 text-[#0C923C]">
              Você economiza {formatBRL(yearlyDiscount)} com o plano anual
            </div>
          )}
          {couponApplied && discountPercent != null && (
            <div className="caption1 mb-1 text-[#0C923C]">
              Você economiza {formatBRL(couponSavedSelected)} com o cupom
            </div>
          )}
          <div className="mb-4 ml-auto max-w-[27rem] text-xs text-neutral-600">
            Ao clicar em “Acessar Models Club” você afirma que leu e concorda
            com Termos de Uso* e Política de Privacidade*, por segurança pedimos
            que todos os clientes leiam com calma e atenção todo o Termo de Uso
            e Política&nbsp;de&nbsp;Privacidade
          </div>

          <div className="flex items-center justify-end gap-4">
            {selectedPaymentMethod === "card" ? (
              <>
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={cn(
                    "rounded-md border border-neutral-500 bg-transparent px-4 py-2 text-neutral-500",
                    currentStep === 0 && "hidden",
                  )}
                >
                  Voltar
                </button>
                <button
                  onClick={() => handleNext(form)}
                  disabled={isPaying}
                  className="from-primary to-secondary w-full rounded-md bg-gradient-to-br px-4 py-2 font-semibold shadow-sm"
                >
                  {isPaying ? (
                    <Loader2 className="animate-spin" />
                  ) : currentStep !== 3 ? (
                    "Próximo"
                  ) : (
                    "Acessar Jurid IA"
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/")}
                className={cn(
                  "flex h-12 w-60 cursor-default items-center justify-center gap-2 rounded-lg border border-zinc-400 p-2 font-semibold text-zinc-400 opacity-50 transition-all duration-300",
                  !isPixGenerated && "hidden",
                  buttonText === "Confirmar Pagamento" &&
                    "bg-primary border-primary cursor-pointer text-white opacity-100",
                )}
                disabled={buttonText === "Aguardando Pagamento"}
              >
                <span>{buttonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PaymentForm;
