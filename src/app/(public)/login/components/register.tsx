import { useApiContext } from "@/context/ApiContext";
import { cn } from "@/utils/cn";
import { maskCep, maskCpfCnpj, maskPhone } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Hash,
  House,
  List,
  Loader2,
  MapPin,
  MapPinHouse,
  Phone,
  User,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import Field from "./field";
import { Form, FormField, FormItem, FormMessage } from "./form";

const FirstFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  mobilePhone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
  email: z.email({ message: "Email Inválido" }),
  password: z
    .object({
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Senhas não coincidem",
      path: ["confirm"],
    }),
});

const SecondFormSchema = z.object({
  lawFirmName: z.string().min(1, "Nome do escritório é obrigatório"),
  cpfCnpj: z
    .object({
      cpf: z.string().optional(),
      lawFirmCnpj: z.string().optional(),
    })
    .refine((data) => data.cpf || data.lawFirmCnpj, {
      message: "Preencha CPF ou CNPJ",
      path: ["cpf"],
    }),
  paymentType: z.enum(["CPF", "CNPJ"]),
  postalCode: z.string().min(1, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
});

const FormSchema = z.object({
  ...FirstFormSchema.shape,
  ...SecondFormSchema.shape,
});

const CreateAccount = () => {
  const { PostAPI, setToken } = useApiContext();
  const cookies = useCookies();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tempCpfCnpj, setTempCpfCnpj] = useState("");
  const [tempCep, setTempCep] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRememberPassword, setShowRememberPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      mobilePhone: "",
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      lawFirmName: "",
      cpfCnpj: {
        cpf: "",
        lawFirmCnpj: "",
      },
      paymentType: "CPF",
      postalCode: "",
      address: "",
      number: "",
    },
  });
  async function GetAddressData() {
    // const data = await addressApi(`${tempCep}/json`);
    // if (data.status === 200) {
    //   form.setValue("address", data.body.logradouro + ", " + data.body.bairro);
    //   form.setValue("postalCode", tempCep);
    // }
  }

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: [
        "name",
        "mobilePhone",
        "email",
        "password.password",
        "password.confirm",
      ] as const,
      1: [
        "lawFirmName",
        "cpfCnpj.cpf",
        "cpfCnpj.lawFirmCnpj",
        "paymentType",
        "postalCode",
        "address",
        "number",
      ] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  const handleNext = async (
    form: UseFormReturn<z.infer<typeof FormSchema>>,
  ) => {
    router.push("/checkout");
    // if (currentStep === 0) {
    //   const isValid = await validateStep(currentStep);
    //   if (!isValid) {
    //     const errors = form.formState.errors;

    //     const fieldLabels: Record<
    //       keyof z.infer<typeof FirstFormSchema>,
    //       string | Record<"password" | "confirm", string>
    //     > = {
    //       name: "Nome",
    //       mobilePhone: "Telefone",
    //       email: "Email",
    //       password: {
    //         password: "Senha",
    //         confirm: "Confirmar Senha",
    //       },
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
    // } else if (currentStep === 1) {
    //   const isValid = await validateStep(currentStep);
    //   if (!isValid) {
    //     const errors = form.formState.errors;

    //     const fieldLabels: Record<
    //       keyof z.infer<typeof SecondFormSchema>,
    //       string
    //     > = {
    //       lawFirmName: "Nome do Escritório",
    //       cpfCnpj: "CPF ou CNPJ",
    //       paymentType: "Tipo de pagamento",
    //       postalCode: "CEP",
    //       address: "Endereço",
    //       number: "Número",
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
    //     setIsCreating(true);
    //     const create = await PostAPI(
    //       "/lawyer/register",
    //       {
    //         ...form.getValues(),
    //         phone: form.getValues("mobilePhone"),
    //         cpf: form.getValues("cpfCnpj.cpf"),
    //         lawFirmCnpj: form.getValues("cpfCnpj.lawFirmCnpj"),
    //         password: form.getValues("password.password"),
    //       },
    //       false,
    //     );
    //     if (create.status === 200) {
    //       cookies.set(
    //         process.env.NEXT_PUBLIC_USER_TOKEN as string,
    //         create.body.accessToken,
    //       );
    //       setToken(create.body.accessToken);
    //       router.push("/checkout");
    //       return setIsCreating(false);
    //     }
    //     toast.error("Erro ao cadastrar, tente novamente.");
    //     return setIsCreating(false);
    //   }
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  useEffect(() => {
    if (tempCpfCnpj) {
      if (tempCpfCnpj.length === 14) {
        form.setValue("cpfCnpj.cpf", tempCpfCnpj);
        form.setValue("cpfCnpj.lawFirmCnpj", "");
        form.setValue("paymentType", "CPF");
      } else if (tempCpfCnpj.length === 18) {
        form.setValue("cpfCnpj.cpf", "");
        form.setValue("cpfCnpj.lawFirmCnpj", tempCpfCnpj);
        form.setValue("paymentType", "CNPJ");
      } else {
        form.setValue("cpfCnpj.cpf", "");
        form.setValue("cpfCnpj.lawFirmCnpj", "");
      }
    }
  }, [tempCpfCnpj, form]);

  useEffect(() => {
    if (tempCep.length === 9) {
      GetAddressData();
    } else {
    }
  }, [tempCep]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4" onKeyDown={handleKeyPress}>
        {currentStep === 0 ? (
          <>
            <FormField
              key="name"
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Nome"
                    Svg={<User className="text-neutral-500" />}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="mobilePhone"
              name="mobilePhone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Telefone"
                    Svg={<Phone className="text-neutral-500" />}
                    icon="mobilePhone"
                    value={maskPhone(field.value)}
                    onChange={(e: any) => field.onChange(e.target.value)}
                    required
                    maxLength={15}
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="email"
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Email"
                    icon="email"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="password.password"
              name="password.password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Field
                      classInput="border-neutral-500"
                      placeholder="Senha"
                      icon="lock"
                      type={showPassword ? "text" : "password"}
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="password.confirm"
              name="password.confirm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <Field
                      classInput="border-neutral-500"
                      placeholder="Senha"
                      icon="lock"
                      type={showRememberPassword ? "text" : "password"}
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRememberPassword(!showRememberPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500"
                    >
                      {showRememberPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
          </>
        ) : currentStep === 1 ? (
          <>
            <FormField
              key="lawFirmName"
              name="lawFirmName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Nome do escritório"
                    Svg={<House className="text-neutral-500" />}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <div>
              <Field
                classInput="border-neutral-500"
                placeholder="CPF/CNPJ de faturamento"
                Svg={<Hash className="text-neutral-500" />}
                value={tempCpfCnpj}
                onChange={(e: { target: { value: string } }) =>
                  setTempCpfCnpj(maskCpfCnpj(e.target.value))
                }
                required
                maxLength={18}
              />
              {form.formState.errors.cpfCnpj?.cpf && (
                <p className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500">
                  {form.formState.errors.cpfCnpj.cpf.message}
                </p>
              )}
            </div>
            <FormField
              key="postalCode"
              name="postalCode"
              control={form.control}
              render={() => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="CEP"
                    icon="name"
                    Svg={<MapPin className="text-neutral-500" />}
                    value={tempCep}
                    onChange={(e: { target: { value: string } }) =>
                      setTempCep(maskCep(e.target.value))
                    }
                    maxLength={9}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="address"
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Endereço"
                    icon="name"
                    Svg={<MapPinHouse className="text-neutral-500" />}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="number"
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="border-neutral-500"
                    placeholder="Número"
                    icon="name"
                    Svg={<List className="text-neutral-500" />}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-4 flex w-full items-center gap-4">
        <button
          onClick={() => setCurrentStep(0)}
          className={cn(
            "rounded-md border border-neutral-500 bg-transparent px-4 py-2 text-neutral-500",
            currentStep === 0 && "hidden",
          )}
        >
          Voltar
        </button>
        <button
          onClick={() => handleNext(form)}
          disabled={isCreating}
          className="from-primary to-secondary w-full rounded-md bg-gradient-to-br px-4 py-2 font-semibold shadow-sm"
        >
          {isCreating ? (
            <Loader2 className="animate-spin" />
          ) : currentStep === 0 ? (
            "Próximo"
          ) : (
            "Fazer parte da Models Club"
          )}
        </button>
      </div>
      <div className="text-sm text-neutral-500">
        Ao criar uma conta, você aceita nossos{" "}
        <button
          className="transition-colors hover:text-neutral-300"
          onClick={() => setIsTermModalOpen(true)}
        >
          Termos de Serviço
        </button>{" "}
        e nossa{" "}
        <button
          className="transition-colors hover:text-neutral-300"
          onClick={() => setIsTermModalOpen(true)}
        >
          Política de Privacidade
        </button>
        .
      </div>
      {/* <TermsModal
        onClose={() => setIsTermModalOpen(false)}
        visible={isTermModalOpen}
      /> */}
    </Form>
  );
};

export default CreateAccount;
