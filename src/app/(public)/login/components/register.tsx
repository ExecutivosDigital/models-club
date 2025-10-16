/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApiContext } from "@/context/ApiContext";
import { maskCpfCnpj, maskPhone } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Hash,
  Loader2,
  LockIcon,
  Mail,
  Phone,
  Ticket,
  User,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import Field from "./field";
import { Form, FormField, FormItem, FormMessage } from "./form";

export interface RegisterClientServiceRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpfCnpj: string;
  coupon?: string;
}

interface RegisterProps {
  setSelectedStep: React.Dispatch<React.SetStateAction<number>>;
}

const FormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email({ message: "Email Inválido" }),
  phone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
  cpfCnpj: z.string().min(14, "CPF/CNPJ deve ter pelo menos 14 caracteres"),
  coupon: z.string().optional(),
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

const CreateAccount = ({ setSelectedStep }: RegisterProps) => {
  const { PostAPI, setToken } = useApiContext();
  const cookies = useCookies();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRememberPassword, setShowRememberPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      cpfCnpj: "",
      coupon: "",
      password: {
        password: "",
        confirm: "",
      },
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["email", "password", "name", "phone", "cpfCnpj"] as const,
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
    const isValid = await validateStep(0);
    if (!isValid) {
      const errors = form.formState.errors;
      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        email: "Email",
        password: "Senha",
        name: "Nome",
        phone: "Telefone",
        coupon: "Cupom",
        cpfCnpj: "CPF/CNPJ",
      };
      const secondErrorField = Object.keys(
        errors,
      )[0] as keyof typeof fieldLabels;
      const secondError = errors[secondErrorField];
      if (secondError?.message && secondErrorField in fieldLabels) {
        const fieldLabel = fieldLabels[secondErrorField];
        return toast.error(`${fieldLabel}: ${secondError.message}`);
      }
      return toast.error("Por favor, corrija os erros no formulário.");
    } else {
      setIsCreating(true);
      const create = await PostAPI(
        "/client/register",
        {
          ...form.getValues(),
          password: form.getValues("password").password,
        },
        false,
      );
      if (create.status === 200) {
        cookies.set(
          process.env.NEXT_PUBLIC_USER_TOKEN as string,
          create.body.accessToken,
        );
        setToken(create.body.accessToken);
        router.push("/plans");
        return setIsCreating(false);
      }
      toast.error("Email ou CPF já cadastrado");
      return setIsCreating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  // useEffect(() => {
  //   if (tempCpfCnpj) {
  //     if (tempCpfCnpj.length === 14) {
  //       form.setValue("cpfCnpj.cpf", tempCpfCnpj);
  //       form.setValue("cpfCnpj.lawFirmCnpj", "");
  //       form.setValue("paymentType", "CPF");
  //     } else if (tempCpfCnpj.length === 18) {
  //       form.setValue("cpfCnpj.cpf", "");
  //       form.setValue("cpfCnpj.lawFirmCnpj", tempCpfCnpj);
  //       form.setValue("paymentType", "CNPJ");
  //     } else {
  //       form.setValue("cpfCnpj.cpf", "");
  //       form.setValue("cpfCnpj.lawFirmCnpj", "");
  //     }
  //   }
  // }, [tempCpfCnpj, form]);

  // useEffect(() => {
  //   if (tempCep.length === 9) {
  //     GetAddressData();
  //   } else {
  //   }
  // }, [tempCep]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-1 2xl:gap-4" onKeyDown={handleKeyPress}>
        <>
          <FormField
            key="name"
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative">
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
            key="phone"
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Field
                  classInput="border-neutral-500"
                  placeholder="Telefone"
                  Svg={<Phone className="text-neutral-500" />}
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
                  Svg={<Mail className="text-neutral-500" />}
                  value={field.value}
                  onChange={field.onChange}
                  required
                />
                <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            key="cpfCnpj"
            name="cpfCnpj"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Field
                  classInput="border-neutral-500"
                  placeholder="000.000.000-00"
                  Svg={<Hash className="text-neutral-500" />}
                  value={field.value}
                  onChange={(e: any) =>
                    field.onChange(maskCpfCnpj(e.target.value))
                  }
                  required
                  maxLength={14}
                />
                <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            key="coupon"
            name="coupon"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Field
                  classInput="border-neutral-500"
                  placeholder="Cupom"
                  Svg={<Ticket className="text-neutral-500" />}
                  value={field.value || ""}
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
                    Svg={<LockIcon className="text-neutral-500" />}
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
                    Svg={<LockIcon className="text-neutral-500" />}
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
      </div>
      <div className="mt-4 flex w-full items-center gap-4">
        <button
          onClick={() => handleNext(form)}
          disabled={isCreating}
          className="from-primary to-secondary w-full rounded-md bg-gradient-to-br px-4 py-2 font-semibold shadow-sm"
        >
          {isCreating ? (
            <div className="flex w-full items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Criando</span>
            </div>
          ) : (
            "Fazer parte da Models Club"
          )}
        </button>
      </div>
      <div className="text-xs text-neutral-500 2xl:text-sm">
        Ao criar uma conta, você aceita nossos{" "}
        <button
          className="transition-colors hover:text-neutral-300"
          // onClick={() => setIsTermModalOpen(true)}
        >
          Termos de Serviço
        </button>{" "}
        e nossa{" "}
        <button
          className="transition-colors hover:text-neutral-300"
          // onClick={() => setIsTermModalOpen(true)}
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
