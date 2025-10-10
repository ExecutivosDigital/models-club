import { useApiContext } from "@/context/ApiContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Field from "./field";
import { Form, FormField, FormItem, FormMessage } from "./form";

type SignInProps = {
  onClick: () => void;
};

const FormSchema = z.object({
  email: z.email({ message: "Email Inválido" }),
  password: z.string().min(6, "Senha inválida"),
});

const SignIn = ({ onClick }: SignInProps) => {
  const cookies = useCookies();
  const router = useRouter();
  const { PostAPI, setToken } = useApiContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["email", "password"] as const,
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

      // Define field labels with proper typing
      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        email: "Email",
        password: "Senha",
      };

      // Get first error with type safety
      const firstErrorField = Object.keys(
        errors,
      )[0] as keyof typeof fieldLabels;
      const firstError = errors[firstErrorField];

      if (firstError?.message && firstErrorField in fieldLabels) {
        const fieldLabel = fieldLabels[firstErrorField];
        return toast.error(`${fieldLabel}: ${firstError.message}`);
      }

      return toast.error("Por favor, corrija os erros no formulário.");
    } else {
      setIsLoggingIn(true);
      const login = await PostAPI(
        "/lawyer/authenticate",
        form.getValues(),
        false,
      );
      if (login.status === 200) {
        cookies.set(
          process.env.NEXT_PUBLIC_USER_TOKEN as string,
          login.body.accessToken,
        );
        setToken(login.body.accessToken);
        router.push("/");
        return setIsLoggingIn(false);
      }
      toast.error("Erro ao efetuar login, tente novamente.");
      setIsLoggingIn(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4" onKeyDown={handleKeyPress}>
        <FormField
          key="email"
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Field
                classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
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
          key="password"
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Field
                  classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent pr-10"
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
                  className="text-n-4 absolute inset-y-0 right-0 flex items-center pr-3.5"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
            </FormItem>
          )}
        />
        {/* <Field
        className="mb-2"
        classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Senha"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      /> */}
      </div>
      <button
        className="base2 text-secondary-1 hover:text-secondary-1/90 mb-6 transition-colors"
        type="button"
        onClick={onClick}
      >
        Esqueceu a senha?
      </button>
      <button
        onClick={() => handleNext(form)}
        disabled={isLoggingIn}
        className="btn-secondary btn-large w-full"
      >
        {isLoggingIn ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Acessar Jurid-IA"
        )}
      </button>
    </Form>
  );
};

export default SignIn;
