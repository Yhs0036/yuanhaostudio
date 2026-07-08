import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  Copy,
  DatabaseZap,
  Gauge,
  Mail,
  MessageCircle,
  Phone,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import BorderGlow from './components/BorderGlow.jsx';

const Prism = lazy(() => import('./components/Prism.jsx'));

const navItems = [
  { label: '首页', href: '#home' },
  { label: '精选项目', href: '#projects' },
  { label: '能力', href: '#capabilities' },
  { label: '联系', href: '#contact' },
];

const projects = [
  {
    title: '企业工单智能 Agent 平台',
    role: 'AI 应用开发',
    period: '2026.04 - 2026.06',
    intro:
      '面向企业内部 IT 支持场景，构建支持多用户登录、多会话对话、Agent 工具调用、知识库检索、自动创建工单与状态流转的智能平台。',
    tags: ['FastAPI', 'LangGraph', 'LangChain', 'Docker', 'Langfuse'],
    highlights: [
      '围绕账号权限、VPN、硬件、安全邮件与业务系统故障设计工单数据模型和服务层。',
      '通过 Session Token 鉴权与后端上下文注入，保证 Agent 工具执行时的用户数据隔离。',
      '接入 Prometheus、Grafana 与 Langfuse，覆盖 API、工具调用、模型响应和异常链路追踪。',
    ],
    tone: 'lime',
    Icon: Workflow,
  },
  {
    title: '扫地机器人智能客服系统',
    role: 'AI 应用开发',
    period: '2026.01 - 2026.04',
    intro:
      '为扫地机器人/扫拖一体机场景搭建垂类智能客服，支持产品知识问答、故障排查、维护建议和月度使用报告生成。',
    tags: ['Python', 'LangChain', 'Qwen', 'Chroma', 'RAG', 'Docker'],
    highlights: [
      '封装知识检索、用户信息、月份上下文、使用记录查询等工具，形成完整 ReAct Agent 链路。',
      '基于 Chroma 构建垂类知识库，提升故障、售后和选购问题的回答准确性。',
      '用 Middleware 记录工具调用、模型调用、异常原因，并完成 11 个测试用例与双环境验证。',
    ],
    tone: 'cyan',
    Icon: DatabaseZap,
  },
  {
    title: '具身智能机械臂控制系统',
    role: '机器人视觉与控制开发',
    period: '2025.08 - 2025.11',
    intro:
      '完成机械臂运行环境、图像识别端、硬件设备端与语音输入控制端联调，实现网页/语音指令到机械臂动作的控制链路。',
    tags: ['OpenCV', 'FastAPI', 'Gradio', 'Ollama', 'Robot Control'],
    highlights: [
      '使用 OpenCV 完成颜色识别、掩膜筛选、噪点消除、轮廓提取与 ROI 切割。',
      '结合 FastAPI、Gradio、Ollama 与语音模型，把自然语言控制接入硬件执行链路。',
      '项目期间获校级“优秀实习生”。',
    ],
    tone: 'amber',
    Icon: Radar,
  },
];

const capabilities = [
  {
    title: 'Agent 编排',
    text: '熟悉任务规划、工具调用、流程编排、上下文注入和记忆系统的基础设计。',
    Icon: Bot,
  },
  {
    title: 'RAG 与知识库',
    text: '能完成文档切分、向量化存储、相似度检索与垂类知识问答链路搭建。',
    Icon: BrainCircuit,
  },
  {
    title: '后端接口工程',
    text: '熟练使用 FastAPI，能围绕登录鉴权、会话、多用户隔离和业务服务层落地接口。',
    Icon: Code2,
  },
  {
    title: '可观测性',
    text: '关注结构化日志、request_id、指标监控、异常追踪和 Agent 执行链路闭环。',
    Icon: Activity,
  },
  {
    title: '测试与部署',
    text: '具备 Windows 本地与 Linux 服务器运行验证经验，使用 Docker、uv 与测试用例保障交付。',
    Icon: ShieldCheck,
  },
  {
    title: 'AI 工具实践',
    text: '熟悉 Codex、Claude Code 等 Agent 工具，能结合真实需求完成开发、审查与问题定位。',
    Icon: Gauge,
  },
];

const glowThemes = {
  lime: {
    glowColor: '94 100 73',
    colors: ['#b8ff74', '#71efe1', '#f2f2eb'],
  },
  cyan: {
    glowColor: '176 78 69',
    colors: ['#71efe1', '#78a8ff', '#b8ff74'],
  },
  amber: {
    glowColor: '37 62 60',
    colors: ['#d7a55a', '#b8ff74', '#71efe1'],
  },
};

const capabilityGlowThemes = [
  glowThemes.lime,
  glowThemes.cyan,
  glowThemes.amber,
  { glowColor: '116 80 72', colors: ['#9cf46c', '#f2f2eb', '#71efe1'] },
  { glowColor: '82 90 72', colors: ['#d7ff72', '#71efe1', '#d7a55a'] },
  { glowColor: '190 80 72', colors: ['#71efe1', '#b8ff74', '#f2f2eb'] },
];

function Header({ activeSection, isFloating }) {
  return (
    <header className={`site-header ${isFloating ? 'is-floating' : ''}`}>
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="返回首页">
          <span className="brand-mark">YH</span>
          <span className="brand-text">Yuan Hao</span>
        </a>
        <nav className="main-nav" aria-label="页面导航">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                className={isActive ? 'is-active' : undefined}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <a className={`nav-contact ${activeSection === 'contact' ? 'is-active' : ''}`} href="#contact">
          <Mail size={18} aria-hidden="true" />
          <span>联系我</span>
        </a>
      </div>
    </header>
  );
}

function ProjectVisual({ project }) {
  const Icon = project.Icon;

  return (
    <div className={`project-visual tone-${project.tone}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-icon">
        <Icon size={34} strokeWidth={1.6} />
      </div>
      <div className="visual-flow">
        <span className="flow-link link-a" />
        <span className="flow-link link-b" />
        <span className="flow-link link-c" />
        <span className="flow-node node-a">USER</span>
        <span className="flow-node node-b">SESSION</span>
        <span className="flow-node node-c">TOOL</span>
        <span className="flow-node node-d">TRACE</span>
      </div>
      <div className="visual-metrics">
        <div>
          <span>LATENCY</span>
          <strong>128ms</strong>
        </div>
        <div>
          <span>CALLS</span>
          <strong>24</strong>
        </div>
        <div>
          <span>STATUS</span>
          <strong>OK</strong>
        </div>
      </div>
      <div className="visual-console">
        <span>tool.invoke</span>
        <span>rag.retrieve</span>
        <span>trace.flush</span>
      </div>
      <div className="visual-lines">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-status">
        <span>Agent</span>
        <span>Running</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured }) {
  const theme = glowThemes[project.tone] ?? glowThemes.lime;

  return (
    <BorderGlow
      className={`project-card ${featured ? 'featured' : ''}`}
      edgeSensitivity={featured ? 26 : 32}
      glowColor={theme.glowColor}
      backgroundColor="#111312"
      borderRadius={8}
      glowRadius={featured ? 34 : 26}
      glowIntensity={0.9}
      coneSpread={featured ? 24 : 22}
      animated={featured}
      colors={theme.colors}
      fillOpacity={0.28}
    >
      <ProjectVisual project={project} />
      <div className="project-copy">
        <div className="project-meta">
          <span>{project.role}</span>
          <span>{project.period}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.intro}</p>
        <div className="tag-row" aria-label={`${project.title} 技术栈`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ul>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </BorderGlow>
  );
}

function CapabilityCard({ item, index }) {
  const Icon = item.Icon;
  const theme = capabilityGlowThemes[index % capabilityGlowThemes.length];

  return (
    <BorderGlow
      className="capability-card"
      edgeSensitivity={34}
      glowColor={theme.glowColor}
      backgroundColor="#101211"
      borderRadius={8}
      glowRadius={24}
      glowIntensity={0.75}
      coneSpread={20}
      colors={theme.colors}
      fillOpacity={0.22}
    >
      <div className="capability-icon" aria-hidden="true">
        <Icon size={26} strokeWidth={1.7} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </BorderGlow>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isHeaderFloating, setIsHeaderFloating] = useState(false);
  const [copiedContact, setCopiedContact] = useState('');
  const copyTimerRef = useRef();

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setActiveSection('home');
    setIsHeaderFloating(false);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const target = document.querySelector(hash);

      if (!target) {
        return;
      }

      const sectionId = hash.slice(1);
      setActiveSection(sectionId);
      setIsHeaderFloating(sectionId !== 'home');

      const headerOffset = 78;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'auto',
      });
    };

    window.setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    let frameId = 0;
    let sectionBounds = [];
    let floatingThreshold = Math.max(260, window.innerHeight - 96);

    const measureSections = () => {
      sectionBounds = sectionIds
        .map((id) => {
          const section = document.getElementById(id);

          if (!section) {
            return null;
          }

          return {
            id,
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight,
          };
        })
        .filter(Boolean);

      const projectsSectionTop = sectionBounds.find((section) => section.id === 'projects')?.top;
      floatingThreshold =
        typeof projectsSectionTop === 'number' ? Math.max(0, projectsSectionTop - 96) : Math.max(260, window.innerHeight - 96);
    };

    const updateActiveSection = () => {
      frameId = 0;

      const probeY = window.scrollY + window.innerHeight * 0.38;
      let currentSection = sectionBounds[0]?.id ?? sectionIds[0];

      sectionBounds.forEach((section) => {
        if (probeY >= section.top && probeY < section.bottom) {
          currentSection = section.id;
        } else if (probeY >= section.top) {
          currentSection = section.id;
        }
      });

      setActiveSection((current) => (current === currentSection ? current : currentSection));
      setIsHeaderFloating((current) => {
        const shouldFloat = window.scrollY >= floatingThreshold;

        return current === shouldFloat ? current : shouldFloat;
      });
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    const handleResize = () => {
      measureSections();
      requestUpdate();
    };

    measureSections();
    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const copyContact = async (key, value) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setCopiedContact(key);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopiedContact(''), 1800);
    } catch {
      setCopiedContact('');
    }
  };

  return (
    <div className="site-root">
      <Header activeSection={activeSection} isFloating={isHeaderFloating} />
      <main>
        <section className="hero section-panel" id="home">
          <div className="hero-prism" aria-hidden="true">
            <Suspense fallback={null}>
              <Prism
                animationType="3drotate"
                timeScale={0.28}
                height={3.5}
                baseWidth={5.5}
                scale={1.85}
                hueShift={-0.3}
                colorFrequency={1.48}
                noise={0.08}
                glow={1.58}
                bloom={1.18}
                offset={{ x: 465, y: 8 }}
                maxDpr={1.25}
                suspendWhenOffscreen
              />
            </Suspense>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="page-shell hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">AI Agent Application Developer</p>
              <h1>袁浩</h1>
              <p className="hero-lede">
                把 Agent、RAG、后端接口与可观测性连接成真正能运行、能追踪、能交付的 AI 应用系统。
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#projects">
                  <span>查看项目</span>
                  <ArrowDownRight size={20} aria-hidden="true" />
                </a>
                <a className="secondary-action" href="mailto:2905430878@qq.com">
                  <Mail size={19} aria-hidden="true" />
                  <span>2905430878@qq.com</span>
                </a>
              </div>
            </div>
            <aside className="hero-aside" aria-label="个人概览">
              <BorderGlow
                className="hero-info-card"
                edgeSensitivity={38}
                glowColor="94 100 73"
                backgroundColor="rgba(8, 10, 9, 0.34)"
                borderRadius={8}
                glowRadius={20}
                glowIntensity={0.52}
                coneSpread={20}
                colors={['#b8ff74', '#71efe1', '#f2f2eb']}
                fillOpacity={0.12}
              >
                <span className="aside-label">Education</span>
                <strong>鲁东大学 · 人工智能</strong>
                <span>2022.09 - 2026.07</span>
              </BorderGlow>
              <BorderGlow
                className="hero-info-card"
                edgeSensitivity={38}
                glowColor="176 78 69"
                backgroundColor="rgba(8, 10, 9, 0.34)"
                borderRadius={8}
                glowRadius={20}
                glowIntensity={0.52}
                coneSpread={20}
                colors={['#71efe1', '#b8ff74', '#78a8ff']}
                fillOpacity={0.12}
              >
                <span className="aside-label">Focus</span>
                <strong>Agent / RAG / FastAPI</strong>
                <span>从需求拆解到部署验证</span>
              </BorderGlow>
              <BorderGlow
                className="hero-info-card"
                edgeSensitivity={38}
                glowColor="37 62 60"
                backgroundColor="rgba(8, 10, 9, 0.34)"
                borderRadius={8}
                glowRadius={20}
                glowIntensity={0.52}
                coneSpread={20}
                colors={['#d7a55a', '#b8ff74', '#71efe1']}
                fillOpacity={0.12}
              >
                <span className="aside-label">Tooling</span>
                <strong>Codex · Claude Code</strong>
                <span>AI 工具辅助开发与代码审查</span>
              </BorderGlow>
            </aside>
          </div>
        </section>

        <section className="projects section-panel" id="projects">
          <div className="page-shell">
            <div className="section-heading">
              <p className="eyebrow">Selected Work</p>
              <h2>精选项目</h2>
              <p>
                这些项目都围绕真实业务链路展开：从 Agent 工具设计、知识库检索，到接口服务、监控追踪与运行验证。
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>

        <section className="capabilities section-panel" id="capabilities">
          <div className="page-shell">
            <div className="section-heading compact">
              <p className="eyebrow">Capabilities</p>
              <h2>能力模块</h2>
              <p>偏工程落地的 AI 应用能力：理解 Agent，也关注权限、日志、测试和部署这些能让系统跑稳的部分。</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <CapabilityCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-panel" id="contact">
          <div className="page-shell contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>期待把 AI 应用做成可用的产品。</h2>
              <p>
                如果你正在寻找能把需求拆开、用 AI 工具高效开发、并把前端体验与后端链路交付到位的候选人，可以直接联系我。
              </p>
            </div>
            <div className="contact-panel">
              <button
                className={copiedContact === 'email' ? 'is-copied' : ''}
                type="button"
                onClick={() => copyContact('email', '2905430878@qq.com')}
                aria-label="复制邮箱 2905430878@qq.com"
              >
                <Mail size={22} aria-hidden="true" />
                <span>2905430878@qq.com</span>
                {copiedContact === 'email' ? (
                  <span className="copy-state">
                    <Check size={17} aria-hidden="true" />
                    <span>已复制</span>
                  </span>
                ) : (
                  <Copy size={18} aria-hidden="true" />
                )}
              </button>
              <button
                className={copiedContact === 'phone' ? 'is-copied' : ''}
                type="button"
                onClick={() => copyContact('phone', '17768006872')}
                aria-label="复制电话 17768006872"
              >
                <Phone size={22} aria-hidden="true" />
                <span>17768006872</span>
                {copiedContact === 'phone' ? (
                  <span className="copy-state">
                    <Check size={17} aria-hidden="true" />
                    <span>已复制</span>
                  </span>
                ) : (
                  <Copy size={18} aria-hidden="true" />
                )}
              </button>
              <button
                className={copiedContact === 'wechat' ? 'is-copied' : ''}
                type="button"
                onClick={() => copyContact('wechat', '17616215332')}
                aria-label="复制微信 17616215332"
              >
                <MessageCircle size={22} aria-hidden="true" />
                <span>微信：17616215332</span>
                {copiedContact === 'wechat' ? (
                  <span className="copy-state">
                    <Check size={17} aria-hidden="true" />
                    <span>已复制</span>
                  </span>
                ) : (
                  <Copy size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
