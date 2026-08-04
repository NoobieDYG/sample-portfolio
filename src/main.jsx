import { StrictMode, useEffect, useMemo, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Radar,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import * as THREE from "three";
import "./styles.css";

const profile = {
  name: "Affaan Jaweed",
  role: "AI Backend Engineer + Computer Vision Engineer",
  location: "Hyderabad, India",
  email: "jmd2k23@gmail.com",
  resume:
    "https://drive.google.com/file/d/1AN6N9aeZhwCnvYB7qnP1XHJslNIkkasp/view?usp=sharing",
  socials: {
    linkedin: "https://linkedin.com/in/affaanjaweed",
    github: "https://github.com/NoobieDYG",
  },
  summary:
    "CSE undergrad building AI-powered backend systems, real-time computer vision pipelines, and LLM automation tooling from prototype to deployment.",
};

const metrics = [
  "Real-time AI backends",
  "Computer vision pipelines",
  "LLM tool execution",
  "Production-minded systems",
];

const experience = [
  {
    product: "DOOH Interactive Platform",
    eyebrow: "SuprEngage - AI Intern",
    time: "July 2025 - April 2026",
    icon: Radar,
    points: [
      "Built real-time face analytics with YOLOv8, ByteTrack, and a fine-tuned ResNet for multi-person tracking and age, gender, and emotion recognition.",
      "Designed FastAPI and WebSocket services for frame-wise inference and real-time communication across interactive ad screens.",
      "Supported virtual try-on streams using face and SMPL body models with Three.js rendering on the frontend.",
      "Improved pipeline latency with threading, caching, and selective model execution.",
    ],
  },
  {
    product: "API Docs to MCP Server Pipeline",
    eyebrow: "SuprEngage - AI Intern",
    time: "July 2025 - April 2026",
    icon: Workflow,
    points: [
      "Built a Python MCP platform connecting SaaS providers including Shopify, Razorpay, Gupshup, and Google Docs through schema-driven tools.",
      "Designed discovery and execution flows using search, schema inspection, and validated tool execution primitives.",
      "Converted OpenAPI specs, Postman collections, GraphQL schemas, and docs into executable MCP tools.",
      "Combined Qdrant vector search with Neo4j graph expansion for agent tool discovery across large catalogs.",
    ],
  },
];

const projects = [
  {
    title: "AI Crowd Surveillance",
    stack: "FastAPI, PostgreSQL, WebSocket, Docker, YOLOv8, CSRNet",
    description:
      "Real-time crowd monitoring backend that processes video analytics, serves live dashboard data, and provides safety recommendations from density and zone activity.",
    links: [
      { label: "Live", href: "https://crowdflow-vtia.onrender.com" },
      { label: "Code", href: "https://github.com/NoobieDYG/R3GE-CrowdFlow" },
    ],
  },
  {
    title: "Inventory Management",
    stack: "Full-stack web app",
    description:
      "Store operations app for tracking grocery inventory, prices, and product management workflows.",
    links: [{ label: "Code", href: "https://github.com/NoobieDYG/store_managment" }],
  },
];

const skillGroups = [
  {
    title: "AI + CV",
    icon: BrainCircuit,
    items: ["PyTorch", "OpenCV", "scikit-learn", "YOLOv8", "CSRNet", "NumPy", "Pandas"],
  },
  {
    title: "Backend",
    icon: Terminal,
    items: ["Python", "FastAPI", "Flask", "WebSocket", "SQLAlchemy", "Docker", "Git"],
  },
  {
    title: "Data + Agents",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Qdrant", "Neo4j", "LangChain", "Azure OpenAI"],
  },
  {
    title: "Languages",
    icon: Code2,
    items: ["Python", "C", "Java", "SQL"],
  },
];

function usePointerDepth() {
  const [style, setStyle] = useState({ "--mx": "0", "--my": "0" });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
      const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);
      setStyle({ "--mx": x, "--my": y });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return style;
}

function DesertCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 150);
    camera.position.set(0, 1.4, 4);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffa758, 2.5);
    dirLight.position.set(0, 10, -25);
    scene.add(dirLight);

    // Sand Ground Plane
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xa84424,
      roughness: 0.98
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Endless Grid Road
    const gridHelper = new THREE.GridHelper(200, 50, 0xfda758, 0xf57d42);
    gridHelper.position.set(0, 0.01, -40); // slightly offset above sand to prevent z-fighting
    scene.add(gridHelper);

    // Procedural Low-Poly Sports Car
    const carGroup = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xeb5e46,
      roughness: 0.1,
      metalness: 0.9
    });
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x190906,
      roughness: 0.05,
      metalness: 0.95
    });
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.9
    });
    const glowRedMat = new THREE.MeshBasicMaterial({
      color: 0xff3300
    });
    const glowYellowMat = new THREE.MeshBasicMaterial({
      color: 0xffdd44
    });

    // Chassis Box
    const chassisGeo = new THREE.BoxGeometry(1.36, 0.35, 2.6);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.25;
    carGroup.add(chassis);

    // Cabin Box
    const cabinGeo = new THREE.BoxGeometry(1.06, 0.38, 1.3);
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.55, -0.2);
    carGroup.add(cabin);

    // Wheels (Cylinders)
    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.3, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    const wheelFL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFL.position.set(-0.75, 0.2, 0.85);
    carGroup.add(wheelFL);

    const wheelFR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFR.position.set(0.75, 0.2, 0.85);
    carGroup.add(wheelFR);

    const wheelBL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelBL.position.set(-0.75, 0.2, -0.85);
    carGroup.add(wheelBL);

    const wheelBR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelBR.position.set(0.75, 0.2, -0.85);
    carGroup.add(wheelBR);

    // Taillights
    const taillightGeo = new THREE.BoxGeometry(0.2, 0.08, 0.05);
    const taillightL = new THREE.Mesh(taillightGeo, glowRedMat);
    taillightL.position.set(-0.5, 0.3, -1.31);
    carGroup.add(taillightL);

    const taillightR = new THREE.Mesh(taillightGeo, glowRedMat);
    taillightR.position.set(0.5, 0.3, -1.31);
    carGroup.add(taillightR);

    // Headlights
    const headlightGeo = new THREE.BoxGeometry(0.18, 0.08, 0.05);
    const headlightL = new THREE.Mesh(headlightGeo, glowYellowMat);
    headlightL.position.set(-0.52, 0.25, 1.31);
    carGroup.add(headlightL);

    const headlightR = new THREE.Mesh(headlightGeo, glowYellowMat);
    headlightR.position.set(0.52, 0.25, 1.31);
    carGroup.add(headlightR);

    scene.add(carGroup);

    // Mountains (Distanced, slow parallax scrolling cones)
    const mountains = [];
    const mountainGroup = new THREE.Group();
    scene.add(mountainGroup);

    const mountainGeo = new THREE.ConeGeometry(14, 24, 4);
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x822d14,
      roughness: 0.96
    });

    for (let i = 0; i < 6; i++) {
      const mountain = new THREE.Mesh(mountainGeo, mountainMat);
      const isLeft = i % 2 === 0;
      const x = isLeft ? -22 - Math.random() * 8 : 22 + Math.random() * 8;
      const z = -20 - i * 32;
      mountain.position.set(x, 9.5, z); // Center position adjusted for 24 height
      mountainGroup.add(mountain);
      mountains.push(mountain);
    }

    // Cactuses (Passing at road speed)
    const obstacles = [];
    const cactusGroup = new THREE.Group();
    scene.add(cactusGroup);

    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.18, 2.0, 8);
    const branchGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
    branchGeo.rotateZ(Math.PI / 2);

    const cactusMat = new THREE.MeshStandardMaterial({
      color: 0x3d6647,
      roughness: 0.8
    });

    const createCactusMesh = () => {
      const cactus = new THREE.Group();

      const trunk = new THREE.Mesh(trunkGeo, cactusMat);
      trunk.position.y = 1.0;
      cactus.add(trunk);

      const branch1 = new THREE.Mesh(branchGeo, cactusMat);
      branch1.position.set(0.35, 1.2, 0);
      cactus.add(branch1);

      const branch1Up = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8), cactusMat);
      branch1Up.position.set(0.7, 1.4, 0);
      cactus.add(branch1Up);

      const branch2 = new THREE.Mesh(branchGeo, cactusMat);
      branch2.position.set(-0.35, 0.8, 0);
      cactus.add(branch2);

      const branch2Up = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8), cactusMat);
      branch2Up.position.set(-0.7, 1.0, 0);
      cactus.add(branch2Up);

      cactus.scale.setScalar(0.75 + Math.random() * 0.6);
      return cactus;
    };

    // Instantiate cactuses
    for (let i = 0; i < 8; i++) {
      const cactus = createCactusMesh();
      const isLeft = i % 2 === 0;
      const x = isLeft ? -5.5 - Math.random() * 6 : 5.5 + Math.random() * 6;
      const z = -15 - i * 15;
      cactus.position.set(x, 0, z);
      cactusGroup.add(cactus);
      obstacles.push(cactus);
    }

    camera.lookAt(0, 0.8, -10);

    // Mouse Tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = event.clientX / window.innerWidth - 0.5;
      mouse.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", handleMouseMove);

    // Resize
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Endless grid speed scroll
      gridHelper.position.z += 0.45;
      if (gridHelper.position.z > 4) {
        gridHelper.position.z = 0;
      }

      // Parallax scroll mountains (slower crawl speed)
      mountains.forEach((mountain) => {
        mountain.position.z += 0.12;
        if (mountain.position.z > 22) {
          mountain.position.z = -140 - Math.random() * 20;
          const isLeft = Math.random() > 0.5;
          mountain.position.x = isLeft ? -22 - Math.random() * 8 : 22 + Math.random() * 8;
        }
      });

      // Obstacles scroll
      obstacles.forEach((cactus) => {
        cactus.position.z += 0.45;
        if (cactus.position.z > 8) {
          cactus.position.z = -100 - Math.random() * 15;
          const isLeft = Math.random() > 0.5;
          cactus.position.x = isLeft ? -5.5 - Math.random() * 6 : 5.5 + Math.random() * 6;
        }
      });

      // Wheel spinning rotation
      const spinSpeed = time * 28;
      wheelFL.rotation.x = spinSpeed;
      wheelFR.rotation.x = spinSpeed;
      wheelBL.rotation.x = spinSpeed;
      wheelBR.rotation.x = spinSpeed;

      // Car steering steer steering
      const targetX = mouse.x * 4.2;
      const diffX = targetX - carGroup.position.x;
      carGroup.position.x += diffX * 0.08;

      carGroup.rotation.y = diffX * 0.16; // Steering angle
      carGroup.rotation.z = -diffX * 0.08; // Lean roll tilt

      // Engine rumble vibration
      carGroup.position.y = Math.sin(time * 60) * 0.008;

      // Camera vibration chase
      camera.position.y = 1.45 + Math.sin(time * 38) * 0.005;
      camera.position.x = Math.cos(time * 28) * 0.003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();

      groundGeo.dispose();
      chassisGeo.dispose();
      cabinGeo.dispose();
      wheelGeo.dispose();
      taillightGeo.dispose();
      headlightGeo.dispose();
      mountainGeo.dispose();
      trunkGeo.dispose();
      branchGeo.dispose();

      groundMat.dispose();
      bodyMat.dispose();
      cabinMat.dispose();
      wheelMat.dispose();
      glowRedMat.dispose();
      glowYellowMat.dispose();
      mountainMat.dispose();
      cactusMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="desert-canvas-container" />;
}

function TiltCard({ children, className = "", ...props }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Rotate max 8 degrees for stereoscopic depth
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    setCoords({ rotateX: rX, rotateY: rY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      className={`spatial-tilt-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: coords.isHovered
          ? `perspective(1200px) rotateX(${coords.rotateX.toFixed(2)}deg) rotateY(${coords.rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
          : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: coords.isHovered ? "transform 0.05s linear" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      {/* Target Lock / CV Scanner HUD corners & lasers for driving theme */}
      <div className="hud-scanner">
        <div className="hud-corner tl" />
        <div className="hud-corner tr" />
        <div className="hud-corner bl" />
        <div className="hud-corner br" />
        <div className="hud-scanline" />
      </div>
      {children}
    </div>
  );
}

function App() {
  const depthStyle = usePointerDepth();
  const navItems = useMemo(
    () => ["signal", "work", "projects", "skills", "contact"],
    []
  );

  return (
    <main className="app-shell" style={depthStyle}>
      {/* 3D background grids & WebGL desert canvas */}
      <div className="spatial-bg" aria-hidden="true">
        <div className="ambient-glow glow-1" />
        <div className="ambient-glow glow-2" />
        <div className="ambient-glow glow-3" />
        {/* Scroll-following fixed sun core */}
        <div className="sun-core" />
        <DesertCanvas />
      </div>

      <nav className="spatial-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#signal" aria-label="Affaan Jaweed home">
          AJ
        </a>
        <div className="nav-links">
          {navItems.slice(1).map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      <section className="hero-section section-frame" id="signal">
        <div className="sunset-stage" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <MapPin size={16} /> Hyderabad, India
          </p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              View work <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Current focus">
          <div className="panel-header">
            <Sparkles size={18} />
            <span>Signal</span>
          </div>
          <p>
            AI systems that stay useful when camera streams, models, agents,
            and APIs are all moving at once.
          </p>
          <div className="signal-chips">
            {metrics.map((metric) => (
              <span key={metric}>
                <Zap size={13} /> {metric}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="intro-band">
        <p>
          I like AI systems that move: camera streams, tool catalogs, live dashboards,
          and agents choosing the right action under real constraints.
        </p>
      </section>

      <section className="section-frame" id="work">
        <SectionHeading
          label="Experience"
          title="Real-time AI products with backend depth."
          text="Two product tracks shaped the current direction: computer vision systems for interactive displays, and LLM/MCP infrastructure for discoverable tool execution."
        />
        <div className="experience-orbit">
          {experience.map((item, index) => (
            <TiltCard key={item.product}>
              <article className="depth-card experience-card">
                <div className="card-number">0{index + 1}</div>
                <item.icon className="card-icon" size={28} />
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.product}</h3>
                <p className="time">{item.time}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="section-frame" id="projects">
        <SectionHeading
          label="Projects"
          title="Applied systems, not just notebooks."
          text="Selected projects lean toward live inference, practical dashboards, and deployable backends."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <TiltCard key={project.title}>
              <article className="depth-card project-card">
                <div>
                  <p className="eyebrow">{project.stack}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="link-row">
                  {project.links.map((link) => (
                    <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="section-frame" id="skills">
        <SectionHeading
          label="Stack"
          title="A toolkit for model-backed products."
          text="Comfortable moving between model integration, API design, data stores, and agent/tooling infrastructure."
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <TiltCard key={group.title}>
              <article className="skill-panel">
                <group.icon size={24} />
                <h3>{group.title}</h3>
                <div className="chip-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="education-strip">
        <div>
          <p className="eyebrow">Education</p>
          <h2>Bachelor of Engineering in CSE (AIML)</h2>
          <p>Lords Institute of Engineering and Technology, Hyderabad - 2023 to 2027</p>
        </div>
        <div>
          <p className="eyebrow">Certification</p>
          <h2>Machine Learning & Deep Learning Bootcamp</h2>
          <p>Udemy</p>
        </div>
      </section>

      <section className="contact-section section-frame" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build something that can handle live data.</h2>
          <p>
            Open to AI engineering, backend systems, computer vision, and LLM tooling
            conversations.
          </p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={`mailto:${profile.email}`}>
            <Mail size={18} /> Email
          </a>
          <a className="button secondary" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a className="button secondary" href={profile.socials.github} target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
        </div>
      </section>

      <footer>
        <Braces size={16} />
        <span>Affaan Jaweed - AI systems, spatially arranged.</span>
        <Network size={16} />
      </footer>
    </main>
  );
}

function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
