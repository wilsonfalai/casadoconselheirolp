"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faBriefcase,
  faCircleXmark,
  faCheck,
  faClock,
  faHandshake,
  faArrowTrendUp,
  faSackDollar,
  faScaleBalanced,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Mercado", href: "#mercado" },
  { label: "Programa", href: "#programa" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Sobre", href: "#sobre" },
  { label: "Instrutores", href: "#instrutores" },
];

const salaryRanges = [
  "Até R$ 10 mil",
  "De R$ 10 mil a R$ 25 mil",
  "Acima de R$ 25 mil",
];

const directCtaUrl = "https://boardbr.com/indicacao-bc";

const initialFormData = {
  name: "",
  email: "",
  whatsapp: "",
  profession: "",
  salaryRange: salaryRanges[0],
};

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildWhatsAppUrl(data: typeof initialFormData) {
  const digits = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const message = [
    "Olá! Acabei de me inscrever no PFCC.",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Profissão: ${data.profession}`,
    `Faixa salarial: ${data.salaryRange}`,
  ].join("\n");

  const query = new URLSearchParams({ text: message }).toString();

  return `https://wa.me/${digits}?${query}`;
}

type CTAButtonProps = {
  children: ReactNode;
  className: string;
  onClick: () => void;
};

function CTAButton({ children, className, onClick }: CTAButtonProps) {
  return (
    <button type="button" className={`${className} cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  );
}

type LeadModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  formData: typeof initialFormData;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof typeof initialFormData, value: string) => void;
};

function LeadModal({
  isOpen,
  isSubmitting,
  formData,
  onClose,
  onSubmit,
  onChange,
}: LeadModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="w-full max-w-[560px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#1b202a_0%,#12161e_100%)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f1c28c]">
              Inscrição PFCC
            </p>
            <h3 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-white">
              Preencha seus dados para continuar no WhatsApp
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center justify-center text-[1.35rem] text-[#d7d2e0] transition-colors duration-200 hover:text-white"
            aria-label="Fechar formulário"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d2e0]" htmlFor="lead-name">
              Nome
            </label>
            <input
              id="lead-name"
              value={formData.name}
              onChange={(event) => onChange("name", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0f131a] px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-[#7f8697] focus:border-[#f1c28c]/50"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d2e0]" htmlFor="lead-email">
              E-mail
            </label>
            <input
              id="lead-email"
              type="email"
              value={formData.email}
              onChange={(event) => onChange("email", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0f131a] px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-[#7f8697] focus:border-[#f1c28c]/50"
              placeholder="voce@empresa.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d2e0]" htmlFor="lead-whatsapp">
              WhatsApp
            </label>
            <input
              id="lead-whatsapp"
              inputMode="numeric"
              value={formData.whatsapp}
              onChange={(event) => onChange("whatsapp", formatWhatsapp(event.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-[#0f131a] px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-[#7f8697] focus:border-[#f1c28c]/50"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d2e0]" htmlFor="lead-profession">
              Profissão
            </label>
            <input
              id="lead-profession"
              value={formData.profession}
              onChange={(event) => onChange("profession", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0f131a] px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-[#7f8697] focus:border-[#f1c28c]/50"
              placeholder="Ex.: Executivo, advogado, engenheiro"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#d7d2e0]" htmlFor="lead-salary-range">
              Faixa salarial
            </label>
            <select
              id="lead-salary-range"
              value={formData.salaryRange}
              onChange={(event) => onChange("salaryRange", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0f131a] px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-[#f1c28c]/50"
            >
              {salaryRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-lg font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : "Continuar no WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const openModal = () => {
    window.location.href = directCtaUrl;
  };
  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const updateFormData = (field: keyof typeof initialFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          whatsapp: formData.whatsapp.replace(/\D/g, ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar lead");
      }

      if (!process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
        throw new Error("WhatsApp não configurado");
      }

      const whatsappUrl = buildWhatsAppUrl(formData);
      setFormData(initialFormData);
      setIsModalOpen(false);
      window.location.href = whatsappUrl;
    } catch {
      window.alert("Não foi possível enviar seus dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LeadModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleLeadSubmit}
        onChange={updateFormData}
      />
      <main id="home" className="min-h-screen bg-[#f6f1e8] text-[#1f2430]">
      <header className="border-b border-black/8 bg-[#fffdf8] shadow-[0_8px_28px_rgba(18,22,30,0.06)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-5 lg:px-10">
          <a
            href="#home"
            aria-label="Board Academy - voltar ao topo"
            className="flex items-center gap-3"
          >
            <Image
              src="/logooutra.webp"
              alt="Board Academy"
              width={120}
              height={36}
              className="h-auto w-[72px] lg:w-[86px]"
            />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-10 text-[1.05rem] font-medium text-[#202532] lg:flex"
          >
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-[#a96d2d]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <CTAButton
            onClick={openModal}
            className="inline-flex min-h-14 items-center justify-center whitespace-nowrap rounded-[18px] bg-[#f6c794] px-6 text-lg font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5 lg:px-8"
          >
            Quero me certificar
          </CTAButton>
        </div>
      </header>

      <section className="bg-[#fffdf8] px-6 pb-10 pt-12 lg:px-10 lg:pb-0 lg:pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex w-full flex-col justify-center pt-6 lg:min-h-[640px]">
            <div className="w-full">
              <p className="text-[1.15rem] font-medium tracking-[-0.02em] text-[#b27636]">
                PFCC Board Academy
              </p>

              <h1 className="mt-8 w-full text-[4.05rem] font-semibold leading-[0.97] tracking-[-0.08em] text-[#171b24] lg:text-[4.6rem]">
                Formação e Certificação de Conselheiro Empresarial 
              </h1>

              <div className="mt-14">
                <p className="w-full text-[1.15rem] leading-[1.6] tracking-[-0.02em] text-[#555f70]">
                  Essa é a sua oportunidade de dar o próximo grande salto na sua
                  carreira. Aproveite a alta necessidade do mercado e torne-se
                  um profissional altamente capacitado para ocupar o cargo mais
                  cobiçado do momento: o Conselheiro.
                </p>
              </div>

              <div className="mt-14 flex">
                <CTAButton
                  onClick={openModal}
                  className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-xl font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Garantir minha vaga
                </CTAButton>
              </div>
            </div>
          </div>

          <div id="video" className="relative flex w-full items-end pb-28 lg:min-h-[640px] lg:pb-24">
            <div className="w-full overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_24px_60px_rgba(28,36,46,0.14)]">
              <iframe
                src="https://www.youtube.com/embed/3h92vw6JVSU?rel=0"
                title="Apresentação da Formação e Certificação de Conselheiro Empresarial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block aspect-[16/11] w-full border-0"
              />
            </div>

            
          </div>
        </div>
      </section>

      <section
        id="mercado"
        className="border-t border-black/8 bg-[#f3ede2] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-[#cfb086]/45 bg-[linear-gradient(145deg,#fffdf8_0%,#f8efe0_50%,#ecd1ae_100%)] p-8 shadow-[0_28px_80px_rgba(88,57,36,0.12)] lg:p-10">
              <div className="flex items-center justify-between gap-4 border-b border-[#cfb086]/35 pb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                    Panorama de Mercado
                  </p>
                  <p className="mt-2 text-base text-[#5c6170]">
                    O que você pode estar deixando na mesa sem essa formação
                  </p>
                </div>
                <span className="rounded-full bg-[#232833]/6 px-4 py-2 text-sm text-[#232833]/70">
                  2026
                </span>
              </div>

              <div className="grid gap-6 pt-8 sm:grid-cols-2">
                <div className="border-l-2 border-[#b27636] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#171b24] lg:text-[3.5rem]">
                    +R$ 25 mil
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#a96d2d]">
                    potencial mensal em cadeiras seniores
                  </p>
                </div>

                <div className="border-l-2 border-[#b27636] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#171b24] lg:text-[3.5rem]">
                    4x
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#a96d2d]">
                    mais chances de ser notado com certificação
                  </p>
                </div>

                <div className="border-l-2 border-[#b27636] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#171b24] lg:text-[3.5rem]">
                    15h
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#a96d2d]">
                    média de trabalho remoto mensal
                  </p>
                </div>

                <div className="border-l-2 border-[#b27636] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#171b24] lg:text-[3.5rem]">
                    148.000
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#a96d2d]">
                    número aproximado de cadeiras vagas de conselheiro
                  </p>
                </div>
              </div>

              
            </div>
          </div>

          <div className="max-w-[650px]">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Dados do Mercado
            </span>

            <h2 className="mt-7 text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#171b24] lg:text-[4rem]">
              A demanda por conselheiros qualificados cresce em ritmo acelerado.
            </h2>

            <p className="mt-7 max-w-[56ch] text-[1.16rem] leading-[1.7] tracking-[-0.015em] text-[#555f70]">
              A carreira mais em alta do mercado é capaz de conciliar propósito,
              ótimos salários e crescimento profissional.
            </p>

           
          </div>
        </div>
      </section>

      <section
        id="programa"
        className="border-t border-black/8 bg-[linear-gradient(#fffdf8_0%,#f7f0e5_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Para quem é este programa?
            </span>

            <h2 className="mt-7 text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-[#171b24] lg:text-[4.35rem]">
             Para quem quer transformar experiência em nova posição.

            </h2>

           
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <article className="group flex min-h-[340px] flex-col rounded-[28px] border border-black/8 bg-white p-8 shadow-[0_18px_40px_rgba(18,22,30,0.06)] transition-colors duration-200 hover:border-[#cfb086]">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                Executivos
              </span>
              <h3 className="mt-6 text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                Transição de carreira com reposicionamento estratégico
              </h3>
              <p className="mt-5 text-[1.03rem] leading-8 text-[#555f70]">
                Para executivos que desejam migrar para uma nova fase
                profissional com mais relevância, autoridade e aumento de
                remuneração.
              </p>
            </article>

            <article className="group flex min-h-[340px] flex-col rounded-[28px] border border-[#cfb086] bg-[linear-gradient(160deg,#fff7ec_0%,#f0dcc1_100%)] p-8 shadow-[0_18px_40px_rgba(169,109,45,0.12)] transition-colors duration-200 hover:border-[#b27636]">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                Profissionais liberais
              </span>
              <h3 className="mt-6 text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                Conhecimento técnico convertido em cadeira de conselho
              </h3>
              <p className="mt-5 text-[1.03rem] leading-8 text-[#4d5667]">
                Para advogados, contadores, engenheiros e administradores que
                querem atuar como conselheiros e abrir uma nova frente de valor
                profissional.
              </p>
            </article>

            <article className="group flex min-h-[340px] flex-col rounded-[28px] border border-black/8 bg-white p-8 shadow-[0_18px_40px_rgba(18,22,30,0.06)] transition-colors duration-200 hover:border-[#cfb086]">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                Empresários
              </span>
              <h3 className="mt-6 text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                Experiência acumulada aplicada no crescimento de outras empresas
              </h3>
              <p className="mt-5 text-[1.03rem] leading-8 text-[#555f70]">
                Para empresários que desejam passar seu conhecimento adiante e
                contribuir de forma estratégica para a evolução de outros
                negócios.
              </p>
            </article>
          </div>

          <div className="mt-12 flex justify-center">
            <CTAButton
              onClick={openModal}
              className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-lg font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              QUERO FAZER MINHA INSCRIÇÃO
            </CTAButton>
          </div>
        </div>
      </section>

      <section
        id="vantagens"
        className="border-t border-black/8 bg-[linear-gradient(180deg,#f7f0e5_0%,#fffdf8_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <div className="max-w-[620px]">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Vantagens de trabalhar como um conselheiro
            </span>

            <h2 className="mt-7 text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-[#171b24] lg:text-[4.15rem]">
              Uma posição de alto valor, baixa carga horária e grande potencial
              de renda.
            </h2>

            <p className="mt-7 max-w-[50ch] text-[1.14rem] leading-[1.7] tracking-[-0.015em] text-[#555f70]">
              Atuar como conselheiro permite ampliar impacto profissional sem
              depender de uma rotina operacional pesada. É uma forma estratégica
              de crescer mantendo liberdade, autoridade e remuneração.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 hidden w-px bg-[linear-gradient(180deg,transparent,#cfb086_20%,#cfb086_80%,transparent)] lg:block" />

            <div className="space-y-0 lg:pl-10">
              <div className="group border-b border-black/8 py-8 first:border-t first:border-black/8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <span className="inline-flex items-center justify-center text-[1.65rem] text-[#a96d2d]">
                    <FontAwesomeIcon icon={faSackDollar} />
                  </span>
                  <div className="max-w-[700px]">
                    <h3 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                      Alta remuneração
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-8 text-[#555f70]">
                      Um conselheiro independente recebe, em média, R$15.000,00
                      mensais por conselho, podendo atuar em até cinco empresas
                      de diferentes segmentos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group border-b border-black/8 py-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <span className="inline-flex items-center justify-center text-[1.65rem] text-[#a96d2d]">
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  <div className="max-w-[700px]">
                    <h3 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                      Baixa carga horária
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-8 text-[#555f70]">
                      Além de poder atuar remotamente de qualquer lugar do mundo, um
                      conselheiro dedica apenas 12 horas mensais para cada
                      conselho.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group border-b border-black/8 py-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <span className="inline-flex items-center justify-center text-[1.65rem] text-[#a96d2d]">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                  <div className="max-w-[700px]">
                    <h3 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24] transition-colors duration-200 group-hover:text-[#a96d2d]">
                      Possibilidade de atuar simultaneamente
                    </h3>
                    <p className="mt-3 text-[1.05rem] leading-8 text-[#555f70]">
                      Quem ainda atua no mercado pode fazer parte de um
                      conselho sem precisar abrir mão do cargo atual, somando
                      influência e nova renda à carreira.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="metodologia"
        className="border-t border-black/8 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f0e5_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[1040px] text-center">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.05em] text-[#a96d2d]">
              CONHEÇA A METODOLOGIA
            </span>

            <h2 className="mt-8 text-[3rem] font-semibold leading-[1.06] tracking-[-0.065em] text-[#171b24] lg:text-[4.4rem]">
              A metodologia <span className="text-[#a96d2d]">única e ágil</span>{" "}
              para lhe tornar um conselheiro pronto para atuar no mercado atual
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <article className="flex min-h-[430px] flex-col rounded-[24px] border border-[#cfb086] bg-white p-7 shadow-[0_18px_40px_rgba(18,22,30,0.06)]">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#cfb086] text-[1.55rem] text-[#a96d2d]">
                <FontAwesomeIcon icon={faScaleBalanced} />
              </span>
              <h3 className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24]">
                Pilar 1: Fundamentos da Governança
              </h3>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#555f70]">
                Explorando os princípios essenciais da governança corporativa e
                suas aplicações no contexto empresarial, destacando sua
                importância na tomada de decisões estratégicas e no
                fortalecimento das organizações.
              </p>
            </article>

            <article className="flex min-h-[430px] flex-col rounded-[24px] border border-[#cfb086] bg-[linear-gradient(160deg,#fff7ec_0%,#f0dcc1_100%)] p-7 shadow-[0_18px_40px_rgba(169,109,45,0.12)]">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#cfb086] text-[1.55rem] text-[#a96d2d]">
                <FontAwesomeIcon icon={faBrain} />
              </span>
              <h3 className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24]">
                Pilar 2: DNA
              </h3>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#4d5667]">
                Soft e Hard Skills no desenvolvimento de um conselheiro, uma
                estrutura de referência das habilidades e competências exigidas
                de um conselheiro de alto desempenho.
              </p>
            </article>

            <article className="flex min-h-[430px] flex-col rounded-[24px] border border-[#cfb086] bg-white p-7 shadow-[0_18px_40px_rgba(18,22,30,0.06)]">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#cfb086] text-[1.55rem] text-[#a96d2d]">
                <FontAwesomeIcon icon={faToolbox} />
              </span>
              <h3 className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24]">
                Pilar 3: Tool Kit
              </h3>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#555f70]">
                Caixa de ferramentas do conselheiro - Uma visão geral dos
                códigos, regulamentos e padrões de governança mais recentes.
              </p>
            </article>

            <article className="flex min-h-[430px] flex-col rounded-[24px] border border-[#cfb086] bg-white p-7 shadow-[0_18px_40px_rgba(18,22,30,0.06)]">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#cfb086] text-[1.55rem] text-[#a96d2d]">
                <FontAwesomeIcon icon={faHandshake} />
              </span>
              <h3 className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24]">
                Pilar 4: 3 R&apos;s Daily Board
              </h3>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#555f70]">
                Rotinas, Ritos e Rituais do Conselheiro. A agenda impecável para
                maximizar resultados nos conselhos consultivos.
              </p>
            </article>
          </div>

          <div className="mt-12 flex justify-center">
            <CTAButton
              onClick={openModal}
              className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-10 text-lg font-semibold !text-black transition-transform duration-200 hover:-translate-y-0.5"
            >
              QUERO FAZER MINHA INSCRIÇÃO
            </CTAButton>
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="border-t border-black/8 bg-[linear-gradient(180deg,#f3ede2_0%,#fffdf8_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-16">
          <div className="max-w-none">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Sobre a Board Academy
            </span>

            <h2 className="mt-7 text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-[#171b24] lg:text-[4.1rem]">
              A EdTech que chegou para revolucionar a formação de conselheiros.
            </h2>

            <p className="mt-7 text-[1.14rem] leading-[1.8] tracking-[-0.015em] text-[#555f70]">
              A Board Academy é uma EdTech de Formação e Desenvolvimento de
              Conselheiros Consultivos, Independentes e de Administração de
              Empresas, que chegou ao mercado para revolucionar o modelo de
              formação e desenvolvimento de Conselheiros, com uma proposta
              disruptiva e, ao mesmo tempo, democratizar o acesso às posições
              nos Conselhos de Empresas.
            </p>

            <div className="mt-10 flex w-full items-start gap-5 rounded-[28px] border border-[#cfb086] bg-[linear-gradient(135deg,#fff7ec_0%,#ecd1ae_100%)] px-6 py-6 shadow-[0_18px_40px_rgba(169,109,45,0.12)] lg:px-7">
              <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[#cfb086] bg-white/60 text-[1.25rem] text-[#a96d2d]">
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </span>

              <div>
                <h3 className="text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-[#171b24]">
                  O Maior Salto da Sua Carreira
                </h3>
                <p className="mt-3 text-[1.04rem] leading-7 text-[#4d5667]">
                  Use sua experiência para fortalecer empresas, gerar impacto e transformar seu conhecimento em valor para o mercado.
                </p>
              </div>
            </div>
          </div>

          <div className="relative lg:max-w-[520px] lg:justify-self-end">
            <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top_right,rgba(241,194,140,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(64,80,122,0.16),transparent_32%)]" />
            <div className="relative overflow-hidden rounded-[34px] border border-black/8 bg-white shadow-[0_28px_80px_rgba(18,22,30,0.12)]">
              <Image
                src="/lp1/sobre.webp"
                alt="Conselheiros em ambiente corporativo"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>          </div>
        </div>
      </section>

      <section
        id="instrutores"
        className="border-t border-black/8 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f0e5_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-[980px] text-center">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Conheça os instrutores do PFCC
            </span>

            <h2 className="mt-7 text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-[#171b24] lg:text-[4.1rem]">
              Especialistas preparados para te tornar um conselheiro desejado
              pelo mercado.
            </h2>

            <p className="mx-auto mt-7 max-w-[64ch] text-[1.14rem] leading-[1.8] tracking-[-0.015em] text-[#555f70]">
              Nosso time de professores e especialistas é altamente selecionado
              e preparado para te fazer um conselheiro desejado pelo mercado:
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="flex items-start gap-6 rounded-[28px] border border-[#cfb086] bg-[linear-gradient(135deg,#fff7ec_0%,#ecd1ae_100%)] p-6 shadow-[0_18px_40px_rgba(169,109,45,0.12)]">
              <div className="shrink-0 overflow-hidden rounded-[22px] border border-black/8 bg-[#f5efe5]">
                <Image
                  src="/lp1/Diogenes-150x150.webp"
                  alt="Diogenes Lima"
                  width={150}
                  height={150}
                  className="size-28 object-cover sm:size-32"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                  Diogenes Lima
                </span>
                <p className="mt-4 text-[1.04rem] leading-8 text-[#4d5667]">
                  Especialista na Jornada do Cliente, atuando em Vendas,
                  Operações, Compras e Marketing (Inteligência de Mercado e
                  Relacionamento com Clientes) em empresas nacionais e
                  multinacionais de serviços de alimentação, segurança e
                  facilities.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-6 rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_40px_rgba(18,22,30,0.06)]">
              <div className="shrink-0 overflow-hidden rounded-[22px] border border-black/8 bg-[#f5efe5]">
                <Image
                  src="/lp1/Alberto-150x150.webp"
                  alt="Alberto Malta"
                  width={150}
                  height={150}
                  className="size-28 object-cover sm:size-32"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                  Alberto Malta
                </span>
                <p className="mt-4 text-[1.04rem] leading-8 text-[#555f70]">
                  Atua como Consultor em Energia Renovável, Gestor Educacional e
                  Coordenador da Comissão ESG da Board Academy, entre outras
                  notoriedades construídas em muitos anos de experiência nas áreas
                  de saúde e sustentabilidade ambiental.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-6 rounded-[28px] border border-[#cfb086] bg-[linear-gradient(135deg,#fff7ec_0%,#ecd1ae_100%)] p-6 shadow-[0_18px_40px_rgba(169,109,45,0.12)]">
              <div className="shrink-0 overflow-hidden rounded-[22px] border border-black/8 bg-[#f5efe5]">
                <Image
                  src="/lp1/image-31-1-150x150.png"
                  alt="Udo Kurt Gierlich"
                  width={150}
                  height={150}
                  className="size-28 object-cover sm:size-32"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                  Udo Kurt Gierlich
                </span>
                <p className="mt-4 text-[1.04rem] leading-8 text-[#4d5667]">
                  São 34 anos de atuação profissional, dos quais 31 em posições
                  executivas, em grupos multinacionais alemães (Voith e ZF) e
                  grupos familiares brasileiros (Ortosintese, Iconacy e BIO2),
                  com experiência nos segmentos de saúde, bens de capital,
                  serviços e automotivo.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-6 rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_40px_rgba(18,22,30,0.06)]">
              <div className="shrink-0 overflow-hidden rounded-[22px] border border-black/8 bg-[#f5efe5]">
                <Image
                  src="/lp1/catarina-min-1-1-150x150.png"
                  alt="Catarina Pohl"
                  width={150}
                  height={150}
                  className="size-28 object-cover sm:size-32"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#a96d2d]">
                  Catarina Pohl
                </span>
                <p className="mt-4 text-[1.04rem] leading-8 text-[#555f70]">
                  Renomada líder executiva com vasta experiência como CEO e membro
                  de conselhos em empresas multinacionais de grande e médio porte
                  nos setores de varejo e industrial, atuando em segmentos B2B,
                  B2C e O2O. Também é investidora, conselheira estratégica e
                  mentora de governança corporativa.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="jornada"
        className="border-t border-black/8 bg-[linear-gradient(180deg,#f3ede2_0%,#fffdf8_100%)] px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-16">
          <div className="max-w-[720px]">
            <span className="inline-flex rounded-full border border-[#cfb086] px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#a96d2d]">
              Sua jornada começa aqui
            </span>

            <h2 className="mt-7 text-[3rem] font-semibold leading-[1.02] tracking-[-0.065em] text-[#171b24] lg:text-[4.15rem]">
              Chegou a hora de iniciarmos a sua jornada!
            </h2>

            <p className="mt-7 max-w-[58ch] text-[1.14rem] leading-[1.8] tracking-[-0.015em] text-[#555f70]">
              Ao se inscrever no BOARD STARTER + BOARD CLUB, você terá acesso a:
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Programa de 10 horas AO VIVO com instrutores que atuam no mercado.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Acesso de 1 ano ao maior Club de Conselheiros da América Latina.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Descontos exclusivos nos eventos presenciais e outras certificações.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Board Series: encontros semanais do mercado de conselho.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Board Class: a maior plataforma de materiais e conhecimento em governança corporativa.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1c28c] text-sm text-black">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <p className="text-[1.05rem] leading-8 text-[#555f70]">
                  Networking com empresários, executivos e conselheiros para te ajudar a sentar em uma cadeira de conselho.
                </p>
              </div>
            </div>

            <div className="mt-12 flex">
              <CTAButton
                onClick={openModal}
                className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-lg font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                QUERO ME TORNAR UM CONSELHEIRO
              </CTAButton>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[34px] border border-black/8 bg-white shadow-[0_28px_80px_rgba(18,22,30,0.12)]">
              <Image
                src="/lp1/final.webp"
                alt="Profissional em ambiente de estudo e trabalho"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="inscricao" className="sr-only" aria-hidden="true" />
      </main>
    </>
  );
}
