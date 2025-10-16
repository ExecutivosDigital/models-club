import { useApiContext } from "@/context/ApiContext";
import { cn } from "@/utils/cn";
import { CheckCircle, Loader2, TicketPercent } from "lucide-react";
import toast from "react-hot-toast";
import { PlanProps } from "../page";

const details = [
  "Receba o PIX na hora",
  "Acesso à cursos exclusivos",
  "Facilidade de controle",
  "Equipe especializada para ajudar",
];

interface DetailsProps {
  plans: PlanProps | null;
  selectedPaymentMethod: string;
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  discountPercent: number | null;
  setDiscountPercent: React.Dispatch<React.SetStateAction<number | null>>;
  couponApplied: boolean;
  setCouponApplied: React.Dispatch<React.SetStateAction<boolean>>;
  couponLoading: boolean;
  setCouponLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Details({
  plans,
  selectedPaymentMethod,
  couponCode,
  setCouponCode,
  discountPercent,
  setDiscountPercent,
  couponApplied,
  setCouponApplied,
  couponLoading,
  setCouponLoading,
}: DetailsProps) {
  const { GetAPI } = useApiContext();

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

  return (
    <>
      <div className="mb-1 flex items-center justify-between">
        <div className="text-lg font-semibold">Plano Promocional</div>
        <div className="ml-4 rounded bg-neutral-500/20 px-2 py-0.5 text-sm font-semibold text-neutral-500">
          Anual
        </div>
      </div>
      <div className="from-primary to-secondary bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent">
        {selectedPaymentMethod === "card" ? (
          <>
            {plans?.creditValue?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </>
        ) : (
          <>
            {plans?.pixValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </>
        )}
      </div>
      <div className="mt-8 hidden space-y-5 border-t border-neutral-800 pt-8 xl:block">
        {details.map((x: string, index: number) => (
          <div className="flex gap-2" key={index}>
            <CheckCircle className="h-5" />
            {x}
          </div>
        ))}
      </div>
      <div className="caption1 text-n-4/50 mt-5 hidden gap-2 xl:flex">
        <CheckCircle className="h-5" />
        Garantia de Segurança com Banco Central
      </div>

      {/* Cupom ao lado do resumo de preço */}
      <div className="mb-4 hidden flex-col gap-2 xl:flex">
        <div className="hidden items-center gap-3 rounded-xl border border-neutral-800 p-4 md:flex">
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
              "from-primary to-secondary flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-br px-4 font-semibold text-white",
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
        <div className="absolute bottom-20 left-0 flex flex-col gap-2 md:hidden">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-800 p-4">
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
                "from-primary to-secondary flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-br px-4 font-semibold text-white",
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
          {couponApplied && discountPercent != null && (
            <div className="caption1 mt-2 text-[#0C923C]">
              Cupom aplicado: {discountPercent}% de desconto
            </div>
          )}
        </div>
      </div>
    </>
  );
}
