document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     FLECHA DE LA PORTADA
     Lleva suavemente al texto de contexto
  ===================================================== */

  const flecha = document.getElementById("flechaInicio");
  const contexto = document.getElementById("contexto");

  if (flecha && contexto) {

    flecha.addEventListener("click", () => {

      contexto.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  /* =====================================================
     FLORES DE LA PORTADA
     Movimiento + crecimiento al hacer scroll
  ===================================================== */

  const flores =
    document.querySelectorAll(".inicio .flor");

  if (flores.length > 0) {

    const actualizarFlores = () => {

      const scroll = window.scrollY;

      const factor =
        Math.min(scroll / 700, 1);

      const escala =
        1 + factor * 0.45;


      flores.forEach((flor, index) => {

        /*
          Cada flor tiene un movimiento diferente.
          Esto evita que se vean como un solo bloque.
        */

        const movimientos = [
          scroll * 0.025,
          scroll * -0.018,
          scroll * 0.025
        ];

        const movimiento =
          movimientos[index] || 0;


        /*
          Pequeño movimiento vertical
          independiente para cada flor.
        */

        const desplazamientoVertical =
          Math.sin(
            scroll * 0.008 + index * 1.8
          ) * 8;


        flor.style.transform =
          `
          translate(
            ${movimiento}px,
            ${desplazamientoVertical}px
          )
          scale(${escala})
          `;


        /*
          Brillo muy suave durante el scroll.
          El brillo fuerte queda para cuando
          el usuario toque/pase sobre la flor.
        */

        flor.style.filter =
          `
          drop-shadow(
            0 0 ${5 + factor * 10}px
            rgba(
              255,
              75,
              170,
              ${0.12 + factor * 0.18}
            )
          )
          `;

      });

    };


    window.addEventListener(
      "scroll",
      actualizarFlores,
      {
        passive: true
      }
    );


    actualizarFlores();

  }


  /* =====================================================
     BRILLO AL TOCAR LAS FLORES
     
     Especialmente útil en celular:
     al tocar una flor, queda iluminada.
  ===================================================== */

  const items =
    document.querySelectorAll(".inicio .inicio-item");


  items.forEach((item) => {

    const flor =
      item.querySelector(".flor");

    if (!flor) return;


    item.addEventListener("touchstart", () => {

      flor.classList.add("flor-tocada");

    }, {
      passive: true
    });


    item.addEventListener("touchend", () => {

      setTimeout(() => {

        flor.classList.remove("flor-tocada");

      }, 350);

    }, {
      passive: true
    });

  });


  /* =====================================================
     FLORES DE LAS PÁGINAS INTERNAS
  ===================================================== */

  const floresLaterales =
    document.querySelectorAll(".flor-lateral");


  floresLaterales.forEach((flor) => {

    flor.addEventListener("mouseenter", () => {

      flor.style.transform =
        "scale(1.07)";

    });


    flor.addEventListener("mouseleave", () => {

      flor.style.transform =
        "scale(1)";

    });

  });

});