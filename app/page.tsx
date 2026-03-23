const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Mercado", href: "#mercado" },
];

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-[#0e1015] text-[#f8f4ef]"
    >
      <header className="border-b border-white/5 bg-[#232833]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-5 lg:px-10">
          <a
            href="#home"
            aria-label="Board Academy - voltar ao topo"
            className="flex items-center gap-3"
          >
            <span className="grid size-11 place-items-center rounded-full border border-[#f1c28c]/50 text-sm font-semibold tracking-[0.22em] text-[#f1c28c]">
              BA
            </span>
            <span className="text-[2.05rem] font-semibold leading-none tracking-[-0.045em] text-white">
              Board Academy
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-10 text-[1.05rem] font-medium text-white lg:flex"
          >
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-[#f1c28c]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#inscricao"
            className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-lg font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5"
          >
            Quero me certificar
          </a>
        </div>
      </header>

      <section className="px-6 pb-10 pt-12 lg:px-10 lg:pb-0 lg:pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex w-full flex-col justify-center pt-6 lg:min-h-[640px]">
            <div className="w-full">
              <p className="text-[1.15rem] font-medium tracking-[-0.02em] text-[#efba7f]">
                PFCC Board Academy
              </p>

              <h1 className="mt-8 w-full text-[4.05rem] font-semibold leading-[0.97] tracking-[-0.08em] text-white lg:text-[4.6rem]">
                Formação e Certificação de Conselheiro Empresarial 
              </h1>

              <div className="mt-14">
                <p className="w-full text-[1.15rem] leading-[1.6] tracking-[-0.02em] text-[#b8b2c6]">
                  Essa é a sua oportunidade de dar o próximo grande salto na sua
                  carreira. Aproveite a alta necessidade do mercado e torne-se
                  um profissional altamente capacitado para ocupar o cargo mais
                  cobiçado do momento: o Conselheiro.
                </p>
              </div>

              <div className="mt-14 flex">
                <a
                  href="#inscricao"
                  className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-[#f6c794] px-8 text-xl font-medium !text-black transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Garantir minha vaga
                </a>
              </div>
            </div>
          </div>

          <div id="video" className="relative flex w-full items-end pb-28 lg:min-h-[640px] lg:pb-24">
            <div className="w-full overflow-hidden rounded-[28px] bg-[#161a22] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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
        className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(145deg,#232833_0%,#2b2a31_45%,#6f4b32_100%)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:p-10">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f1c28c]">
                    Panorama de Mercado
                  </p>
                  <p className="mt-2 text-base text-[#d8d2e1]">
                    O que você pode estar deixando na mesa sem essa formação
                  </p>
                </div>
                <span className="rounded-full bg-white/6 px-4 py-2 text-sm text-white/80">
                  2026
                </span>
              </div>

              <div className="grid gap-6 pt-8 sm:grid-cols-2">
                <div className="border-l-2 border-[#f1c28c] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-white lg:text-[3.5rem]">
                    +R$ 25 mil
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#f1c28c]">
                    potencial mensal em cadeiras seniores
                  </p>
                </div>

                <div className="border-l-2 border-[#f1c28c] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-white lg:text-[3.5rem]">
                    4x
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#f1c28c]">
                    mais chances de ser notado com certificação
                  </p>
                </div>

                <div className="border-l-2 border-[#f1c28c] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-white lg:text-[3.5rem]">
                    68%
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#f1c28c]">
                    das empresas valorizam formação específica
                  </p>
                </div>

                <div className="border-l-2 border-[#f1c28c] pl-4">
                  <p className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-white lg:text-[3.5rem]">
                    +37%
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#f1c28c]">
                    avanço na busca por governança qualificada
                  </p>
                </div>
              </div>

              
            </div>
          </div>

          <div className="max-w-[650px]">
            <span className="inline-flex rounded-full border border-[#f1c28c]/30 px-5 py-2 text-sm font-medium tracking-[0.04em] text-[#f1c28c]">
              Dados do Mercado
            </span>

            <h2 className="mt-7 text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.06em] text-white lg:text-[4rem]">
              A demanda por conselheiros qualificados cresce em ritmo acelerado.
            </h2>

            <p className="mt-7 max-w-[56ch] text-[1.16rem] leading-[1.7] tracking-[-0.015em] text-[#d7d2e0]">
              A carreira mais em alta do mercado é capaz de conciliar propósito,
              ótimos salários e crescimento profissional.
            </p>

           
          </div>
        </div>
      </section>

      <section id="inscricao" className="sr-only" aria-hidden="true" />
    </main>
  );
}
