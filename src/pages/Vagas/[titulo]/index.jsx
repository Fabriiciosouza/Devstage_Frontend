"use client";

import { useState, useEffect, useContext } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building2,
  CheckCircle,
  Star,
  ArrowLeft,
  Send,
  Heart,
  Share2,
} from "lucide-react";
import Header from "../../../Component/Header";
import { Link, useParams } from "react-router-dom";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Context } from "../../../context/UserContext";

export default function DetalhesVaga() {
  const { authenticated, user, loading } = useContext(Context);
  const { titulo } = useParams();
  const [vaga, setVaga] = useState(null);
  const [candidatando, setCandidatando] = useState(false);
  const [jaCandidatou, setJaCandidatou] = useState(false);
  const [favoritada, setFavoritada] = useState(false);
  const [mostrarModalCandidatura, setMostrarModalCandidatura] = useState(false);
  const [cartaApresentacao, setCartaApresentacao] = useState("");
  const { setFlashMessage } = useFlashMessage();
  

  // Simulação de dados da vaga
  useEffect(() => {
    const carregarVaga = async () => {
      // Simulação de API call
      try {
        const response = await api.get(`/vagas/${titulo}`);
        const { vaga } = response.data;
        

        if (vaga) setVaga(vaga);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao carregar vaga:", error);
        }
      }
    };

    carregarVaga();
  }, [titulo]);

  useEffect(() => {
    if (user && vaga) {
      const candidatura = vaga.candidatos.find(
        (candidatura) => candidatura.usuarioId === user._id
      );
      if (candidatura) {
        setJaCandidatou(true);
        setCartaApresentacao(candidatura.cartaApresentacao);
      }
    }
  }, [user, vaga]);

  const handleCandidatar = async (e) => {
    e.preventDefault();
    setCandidatando(true);
    const id = vaga._id;
    console.log(authenticated);
    try {
      const response = await api.post(`/vagas/CandidatarVaga/${id}`);
      const { vaga } = response.data;
      if (vaga) setVaga(vaga);
      setJaCandidatou(true);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Erro ao carregar vaga:", error);
      }
      setFlashMessage("Voce precisa estar logado para se candidatar.", "error");
    } finally {
      setCandidatando(false);
      setMostrarModalCandidatura(false);
      setCartaApresentacao("");
    }

    // Simulação de candidatura
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setJaCandidatou(true);
    // setCandidatando(false);
    // setMostrarModalCandidatura(false);
    // setCartaApresentacao("");
  };

  const toggleFavorito = () => {
    setFavoritada(!favoritada);
  };

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: vaga?.titulo,
        text: `Confira esta vaga: ${vaga?.titulo} na ${vaga?.empresa}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Vaga não encontrada
            </h1>
            <Link
              to={"/vagas"}
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Botão Voltar */}
          <Link
            to={"/vagas"}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para vagas
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header da Vaga */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={
                      vaga.empresa?.logo
                        ? process.env.REACT_APP_API + vaga.empresa.logo
                        : "https://placehold.co/100x100/EEE/31343C"
                    }
                    alt={vaga.empresa.nome}
                    className="w-16 h-16 rounded-lg object-contain"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {vaga.titulo}
                    </h1>
                    <p className="text-lg text-purple-600 font-semibold mb-2">
                      {vaga.empresa.nome}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vaga.localizacao}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {vaga.modalidade}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {vaga.salario}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleFavorito}
                      className={`p-2 rounded-lg transition-colors ${
                        favoritada
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favoritada ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={compartilhar}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {vaga.tipoContrato}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {vaga.nivel}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {vaga.vagasDisponiveis} vagas
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {vaga.candidatos.length} candidatos
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Publicado em{" "}
                    {new Date(vaga.publicadoEm).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Sobre a vaga
                </h2>
                <div className="prose prose-gray max-w-none">
                  {vaga?.descricao?.split("\n").map((paragrafo, index) => (
                    <p
                      key={index}
                      className="mb-3 text-gray-600 leading-relaxed"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>

              {/* Responsabilidades */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Responsabilidades
                </h2>
                <ul className="space-y-3">
                  {vaga.responsabilidades?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requisitos */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Requisitos
                </h2>
                <ul className="space-y-3">
                  {vaga.requisitos?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diferenciais */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Diferenciais
                </h2>
                <ul className="space-y-3">
                  {vaga.diferenciais?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefícios */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Benefícios
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {vaga.beneficios?.map((beneficio, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sobre a Empresa */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Sobre a {vaga.empresa.nome}
                </h2>
                <div className="prose prose-gray max-w-none mb-6">
                  {vaga?.empresa?.descricao
                    ?.split("\n")
                    .map((paragrafo, index) => (
                      <p
                        key={index}
                        className="mb-3 text-gray-600 leading-relaxed"
                      >
                        {paragrafo}
                      </p>
                    ))}
                </div>

                {vaga?.empresa?.cultura && (
                  <>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Nossa Cultura
                    </h3>
                    <div className="space-y-2">{vaga.empresa.cultura}</div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Card de Candidatura */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-16">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {vaga.salario}
                  </div>
                  <div className="text-gray-600">Salário mensal</div>
                </div>

                {jaCandidatou ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Candidatura efetuada!
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Tudo certo! Agora é só aguardar o contato da empresa.
                    </p>
                    <button className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-semibold">
                      Candidatura enviada
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setMostrarModalCandidatura(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Candidatar-se
                  </button>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Vagas disponíveis</span>
                    <span className="font-semibold">
                      {vaga.vagasDisponiveis}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Candidatos</span>
                    <span className="font-semibold">
                      {vaga.candidatos.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Informações da vaga
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Localização
                      </div>
                      <div className="text-sm text-gray-600">
                        {vaga.localizacao}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Modalidade
                      </div>
                      <div className="text-sm text-gray-600">
                        {vaga.modalidade}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Tipo de contrato
                      </div>
                      <div className="text-sm text-gray-600">
                        {vaga.tipoContrato}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-800">Nível</div>
                      <div className="text-sm text-gray-600">{vaga.nivel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Candidatura */}
        {mostrarModalCandidatura && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Candidatar-se à vaga
              </h3>
              <p className="text-gray-600 mb-4">
                Você está se candidatando para a vaga de{" "}
                <strong>{vaga.titulo}</strong> na{" "}
                <strong>{vaga.empresa.nome}</strong>.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carta de apresentação (opcional)
                </label>
                <textarea
                  value={cartaApresentacao}
                  onChange={(e) => setCartaApresentacao(e.target.value)}
                  placeholder="Conte um pouco sobre você e por que se interessa por esta vaga..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarModalCandidatura(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  data-id={vaga.id}
                  onClick={handleCandidatar}
                  disabled={candidatando}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:from-purple-700 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {candidatando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar candidatura
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
