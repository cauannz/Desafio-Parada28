const carrossel = document.querySelector(".carrossel"),
  primeiraImagem = carrossel.querySelectorAll("img")[0],
  iconesSeta = document.querySelectorAll(".wrapper i");

let iniciouArrasto = false,
  arrastandoAtivo = false,
  prevPageX,
  prevScrollEsquerdo,
  diffPosicao;

const mostrarOcultarIcones = () => {
  let larguraRolagem = carrossel.scrollWidth - carrossel.clientWidth;
  iconesSeta[0].style.display = carrossel.scrollLeft == 0 ? "none" : "block";
  iconesSeta[1].style.display =
    carrossel.scrollLeft == larguraRolagem ? "none" : "block";
};

iconesSeta.forEach((icone) => {
  icone.addEventListener("click", () => {
    let larguraPrimeiraImagem = primeiraImagem.clientWidth + 14;
    carrossel.scrollLeft +=
      icone.id == "esquerda" ? -larguraPrimeiraImagem : larguraPrimeiraImagem;
    setTimeout(() => mostrarOcultarIcones(), 60);
  });
});

const autoRolagem = () => {
  if (
    carrossel.scrollLeft - (carrossel.scrollWidth - carrossel.clientWidth) >
      -1 ||
    carrossel.scrollLeft <= 0
  )
    return;

  diffPosicao = Math.abs(diffPosicao);
  let larguraPrimeiraImagem = primeiraImagem.clientWidth + 14;
  let valDiferenca = larguraPrimeiraImagem - diffPosicao;

  if (carrossel.scrollLeft > prevScrollEsquerdo) {
    return (carrossel.scrollLeft +=
      diffPosicao > larguraPrimeiraImagem / 3 ? valDiferenca : -diffPosicao);
  }

  carrossel.scrollLeft -=
    diffPosicao > larguraPrimeiraImagem / 3 ? valDiferenca : -diffPosicao;
};

const inicioArrasto = (e) => {
  iniciouArrasto = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollEsquerdo = carrossel.scrollLeft;
};

const arrastar = (e) => {
  if (!iniciouArrasto) return;
  e.preventDefault();
  arrastandoAtivo = true;
  carrossel.classList.add("arrastando");
  diffPosicao = (e.pageX || e.touches[0].pageX) - prevPageX;
  carrossel.scrollLeft = prevScrollEsquerdo - diffPosicao;
  mostrarOcultarIcones();
};

const pararArrasto = () => {
  iniciouArrasto = false;
  carrossel.classList.remove("arrastando");

  if (arrastandoAtivo) {
    arrastandoAtivo = false;
    autoRolagem();
  }
};

carrossel.addEventListener("mousedown", inicioArrasto);
carrossel.addEventListener("touchstart", inicioArrasto);

document.addEventListener("mousemove", arrastar);
carrossel.addEventListener("touchmove", arrastar);

document.addEventListener("mouseup", pararArrasto);
carrossel.addEventListener("touchend", pararArrasto);
