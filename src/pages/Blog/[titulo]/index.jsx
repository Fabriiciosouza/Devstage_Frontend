"use client"

import { useState, useEffect } from "react"
import Header from "../../../Component/Header"
import { Link, useParams } from "react-router-dom"
import api from "../../../utils/api"
import useFlashMessage from "../../../hooks/useFlashMessage"

// Dados de exemplo para os posts do blog (mesmos dados da página principal)
const blogPosts = [
    {
        id: 1,
        title: "Como se preparar para entrevistas técnicas de estágio",
        resumo: "Dicas práticas para se destacar em entrevistas técnicas e conquistar a vaga de estágio dos seus sonhos.",
        content: `
      <p>As entrevistas técnicas são uma parte crucial do processo seletivo para estágios em desenvolvimento de software. Elas avaliam não apenas seus conhecimentos técnicos, mas também sua capacidade de resolver problemas, comunicar-se efetivamente e trabalhar sob pressão.</p>
      
      <h3>1. Conheça os fundamentos</h3>
      <p>Independentemente da linguagem ou framework específico da vaga, é essencial ter uma base sólida em estruturas de dados, algoritmos e complexidade de tempo/espaço. Estes são os blocos fundamentais da programação e são frequentemente testados em entrevistas técnicas.</p>
      
      <h3>2. Pratique codificação</h3>
      <p>Utilize plataformas como LeetCode, HackerRank ou CodeSignal para praticar problemas de codificação. Comece com problemas fáceis e vá aumentando gradualmente a dificuldade. Tente resolver pelo menos um problema por dia.</p>
      
      <h3>3. Estude a empresa e a vaga</h3>
      <p>Pesquise sobre a empresa, seus produtos, tecnologias utilizadas e a descrição da vaga. Isso ajudará você a entender o que eles estão procurando e a adaptar suas respostas de acordo.</p>
      
      <h3>4. Prepare-se para perguntas comportamentais</h3>
      <p>Além das questões técnicas, é comum que os entrevistadores façam perguntas comportamentais para avaliar seu fit cultural e soft skills. Prepare exemplos de situações em que você demonstrou trabalho em equipe, resolução de problemas e capacidade de aprendizado.</p>
      
      <h3>5. Faça entrevistas simuladas</h3>
      <p>Pratique com amigos, mentores ou utilize plataformas que oferecem entrevistas simuladas. Isso ajudará você a se sentir mais confortável durante a entrevista real e a receber feedback sobre áreas de melhoria.</p>
      
      <h3>6. Aprenda a pensar em voz alta</h3>
      <p>Durante a resolução de problemas, explique seu raciocínio em voz alta. Isso permite que o entrevistador entenda seu processo de pensamento e possa fornecer dicas se você estiver no caminho errado.</p>
      
      <h3>7. Não tenha medo de pedir esclarecimentos</h3>
      <p>Se uma pergunta não estiver clara, peça esclarecimentos. É melhor entender completamente o problema antes de começar a resolvê-lo do que seguir um caminho incorreto.</p>
      
      <h3>8. Revise seus projetos pessoais</h3>
      <p>Esteja preparado para discutir em detalhes os projetos listados em seu currículo. Os entrevistadores frequentemente perguntam sobre desafios enfrentados, decisões técnicas tomadas e lições aprendidas.</p>
      
      <h3>9. Prepare perguntas para fazer ao entrevistador</h3>
      <p>Ter perguntas preparadas para fazer ao entrevistador demonstra seu interesse na empresa e na posição. Pergunte sobre a cultura da empresa, oportunidades de crescimento ou desafios técnicos que a equipe está enfrentando.</p>
      
      <h3>10. Mantenha a calma e seja autêntico</h3>
      <p>Por fim, lembre-se de que os entrevistadores estão avaliando não apenas suas habilidades técnicas, mas também como seria trabalhar com você. Seja autêntico, mantenha a calma mesmo diante de perguntas difíceis e mostre entusiasmo pela oportunidade.</p>
      
      <p>Seguindo essas dicas e praticando regularmente, você estará bem preparado para enfrentar entrevistas técnicas e aumentar suas chances de conquistar a vaga de estágio dos seus sonhos. Boa sorte!</p>
    `,
        autor: "Ana Rodrigues",
        autorRole: "Recrutadora Senior",
        date: "15 de Maio, 2023",
        category: "Carreira",
        readTime: "5 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["Entrevista", "Estágio", "Carreira"],
    },
    {
        id: 2,
        title: "Tecnologias mais requisitadas para estágios em 2023",
        resumo:
            "Conheça as tecnologias e habilidades mais valorizadas pelas empresas para vagas de estágio em desenvolvimento.",
        content: `
      <p>O mercado de tecnologia está em constante evolução, e as habilidades requisitadas para estágios em desenvolvimento de software mudam a cada ano. Em 2023, algumas tecnologias se destacam como particularmente valiosas para estudantes que buscam oportunidades de estágio.</p>
      
      <h3>1. JavaScript e seus frameworks</h3>
      <p>JavaScript continua sendo a linguagem mais utilizada na web, e o conhecimento de frameworks como React, Vue.js e Angular é altamente valorizado. React, em particular, tem sido mencionado em mais de 60% das vagas de estágio em desenvolvimento front-end.</p>
      
      <h3>2. Python</h3>
      <p>Python se consolidou como uma das linguagens mais versáteis e acessíveis, sendo utilizada em desenvolvimento web, ciência de dados, automação e inteligência artificial. Sua sintaxe clara e curva de aprendizado suave a tornam uma excelente escolha para iniciantes.</p>
      
      <h3>3. Desenvolvimento Mobile</h3>
      <p>Com o crescimento contínuo do uso de dispositivos móveis, habilidades em desenvolvimento de aplicativos para iOS e Android são muito requisitadas. Frameworks como React Native e Flutter, que permitem desenvolvimento cross-platform, estão em alta.</p>
      
      <h3>4. DevOps e Cloud</h3>
      <p>Conhecimentos básicos em DevOps e plataformas de cloud como AWS, Azure ou Google Cloud são diferenciais importantes. Entender conceitos de CI/CD, containerização (Docker) e orquestração (Kubernetes) pode abrir muitas portas.</p>
      
      <h3>5. Bancos de Dados</h3>
      <p>Tanto bancos de dados relacionais (MySQL, PostgreSQL) quanto NoSQL (MongoDB, Firebase) são importantes. Saber modelar dados e escrever queries eficientes é uma habilidade fundamental para qualquer desenvolvedor.</p>
      
      <h3>6. TypeScript</h3>
      <p>TypeScript tem ganhado cada vez mais adoção por adicionar tipagem estática ao JavaScript, resultando em código mais robusto e manutenível. Muitas empresas estão migrando seus projetos para TypeScript.</p>
      
      <h3>7. Testes Automatizados</h3>
      <p>Conhecimento em ferramentas de teste como Jest, Cypress ou Selenium demonstra maturidade e preocupação com a qualidade do código, características muito valorizadas mesmo em estagiários.</p>
      
      <h3>8. Git e Controle de Versão</h3>
      <p>Dominar Git e plataformas como GitHub ou GitLab é essencial para trabalhar em equipe. Entender conceitos como branches, merges, pull requests e resolução de conflitos é fundamental.</p>
      
      <h3>9. Segurança da Informação</h3>
      <p>Com o aumento de ataques cibernéticos, conhecimentos básicos em segurança da informação, como OWASP Top 10 e práticas seguras de desenvolvimento, são cada vez mais valorizados.</p>
      
      <h3>10. Soft Skills</h3>
      <p>Além das habilidades técnicas, competências como comunicação efetiva, trabalho em equipe, resolução de problemas e capacidade de aprendizado contínuo são extremamente importantes e frequentemente decisivas na escolha entre candidatos com habilidades técnicas similares.</p>
      
      <p>Lembre-se que não é necessário dominar todas essas tecnologias para conseguir um estágio. Foque em construir uma base sólida em programação e aprofunde-se em uma ou duas áreas que mais lhe interessam. Projetos pessoais que demonstrem suas habilidades são excelentes formas de se destacar no processo seletivo.</p>
    `,
        autor: "Carlos Mendes",
        autorRole: "Tech Lead",
        date: "02 de Maio, 2023",
        category: "Tecnologia",
        readTime: "7 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["JavaScript", "React", "Node.js", "Tecnologia"],
    },
    {
        id: 3,
        title: "Como montar um portfólio de projetos para estágio",
        resumo:
            "Aprenda a criar um portfólio de projetos que chame a atenção dos recrutadores, mesmo sem experiência profissional.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
        autor: "Mariana Costa",
        autorRole: "UX Designer",
        date: "25 de Abril, 2023",
        category: "Portfólio",
        readTime: "6 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["Portfólio", "Projetos", "GitHub"],
    },
    {
        id: 4,
        title: "Dicas para equilibrar estágio e faculdade",
        resumo: "Estratégias para gerenciar seu tempo e manter um bom desempenho tanto no estágio quanto nos estudos.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
        autor: "Pedro Alves",
        autorRole: "Estudante e Estagiário",
        date: "18 de Abril, 2023",
        category: "Produtividade",
        readTime: "4 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["Produtividade", "Estudo", "Equilíbrio"],
    },
    {
        id: 5,
        title: "O que as empresas buscam em estagiários de desenvolvimento?",
        resumo: "Descubra quais são as habilidades técnicas e comportamentais mais valorizadas pelos recrutadores.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
        autor: "Juliana Martins",
        autorRole: "Gerente de RH",
        date: "10 de Abril, 2023",
        category: "Carreira",
        readTime: "8 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["Soft Skills", "Recrutamento", "Carreira"],
    },
    {
        id: 6,
        title: "Como criar um currículo eficiente para vagas de estágio",
        resumo:
            "Aprenda a destacar suas habilidades e experiências acadêmicas para criar um currículo que chame a atenção.",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
        autor: "Roberto Almeida",
        autorRole: "Consultor de Carreira",
        date: "05 de Abril, 2023",
        category: "Currículo",
        readTime: "5 min de leitura",
        img: "/placeholder.svg?height=400&width=800",
        tags: ["Currículo", "LinkedIn", "Carreira"],
    },
]

// Componente para exibir posts relacionados
function RelatedPostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
            <div className="relative h-40 w-full">
                <img src={process.env.REACT_APP_API + post.imagem_capa || "/placeholder.svg"} alt={post.titulo} fill className="object-cover" />
            </div>
            <div className="p-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.categoria}</span>
                <h3 className="text-lg font-bold text-gray-dark mt-2 mb-1 line-clamp-2">{post.titulo}</h3>
                <p className="text-sm text-gray-dark mb-2 line-clamp-2">{post.resumo}</p>
                <Link
                    to={`/blog/${post.titulo}`}
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                >
                    Ler mais
                    <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default function BlogPost() {
    const { titulo } = useParams();
    const [post, setPost] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const { setFlashMessage } = useFlashMessage(); // Inicialize o hook

    useEffect(() => {
        const fetchArtigo = async () => {
            try {
                const response = await api.get(`/artigos/${titulo}`); // Endpoint para buscar artigos
                setPost(response.data.artigo || []);
                debugger
            } catch (err) {
                console.error("Erro ao carregar artigos:", err);
                setFlashMessage("Erro ao carregar artigos.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchArtigo();
    }, [titulo])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-light flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </main>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-light flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-dark mb-4">Post não encontrado</h1>
                        <p className="text-gray-dark mb-6">O artigo que você está procurando não existe ou foi removido.</p>
                        <Link
                            to="/blog"
                            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Voltar para o Blog
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-light">
                {/* Hero Section */}
                <section className="bg-primary text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center mb-4">
                                <Link to="/blog" className="text-white/80 hover:text-white flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Voltar para o Blog
                                </Link>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{post.categoria}</span>
                                <span className="mx-2 text-white/60">•</span>
                                <span className="text-sm text-white/80">{post.readTime}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.titulo}</h1>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">
                                        {post.autor
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{post.autor}</p>
                                    <p className="text-sm text-white/80">{new Date(post.createdAt).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="relative h-80 w-full mb-8 rounded-xl overflow-hidden">
                                <img src={process.env.REACT_APP_API + post.imagem_capa || "/placeholder.svg"} alt={post.titulo} fill className="object-cover" />
                            </div>

                            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.conteudo }}></div>

                                <div className="mt-8 pt-6 border-t border-gray-medium">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="bg-gray-light text-gray-dark text-sm px-3 py-1 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="pb-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-dark mb-6">Artigos Relacionados</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedPosts.map((relatedPost) => (
                                        <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="bg-primary py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Gostou deste conteúdo?</h2>
                            <p className="text-white/80 mb-8">
                                Inscreva-se em nossa newsletter para receber mais artigos como este diretamente no seu e-mail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail"
                                    className="flex-1 px-4 py-3 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <button className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                    Inscrever-se
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
