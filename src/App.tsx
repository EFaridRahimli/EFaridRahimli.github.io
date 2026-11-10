import {useEffect, useMemo, useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {Layout, LayoutHeader, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Token} from '@astryxdesign/core/Token';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Icon} from '@astryxdesign/core/Icon';
import {ToggleButton, ToggleButtonGroup} from '@astryxdesign/core/ToggleButton';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Divider} from '@astryxdesign/core/Divider';
import {Grid} from '@astryxdesign/core/Grid';
import {HStack, VStack, StackItem} from '@astryxdesign/core/Stack';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';
import {OverflowList} from '@astryxdesign/core/OverflowList';
import {Center} from '@astryxdesign/core/Center';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import {MagnifyingGlassIcon, MoonIcon, SunIcon} from '@heroicons/react/24/outline';
import {ArrowDownTrayIcon} from '@heroicons/react/20/solid';
import {themes, defaultThemeSlug} from './astryx-themes';
import {projects, syncedAt, type Project} from './projects';

const EMAIL = 'erahimlif@gmail.com';
const GITHUB = 'https://github.com/EFaridRahimli';
const LINKEDIN = 'https://www.linkedin.com/in/farid-rahimli-2309/';
const CV = `${import.meta.env.BASE_URL}Farid_Rahimli_CV.pdf`;

const TOOLKIT: [string, string][] = [
  ['Modelling', 'PyTorch, TensorFlow / Keras, scikit-learn, XGBoost, AutoGluon'],
  ['Vision', 'YOLOv8, ResNet, MobileNet, transfer learning'],
  ['NLP and RAG', 'Hybrid retrieval, reranking, cited answers, LLM evaluation'],
  ['MLOps', 'AWS SageMaker, Lambda, Step Functions, S3, Model Monitor'],
  ['Data', 'pandas, NumPy, Matplotlib, Seaborn'],
  ['Build', 'Python, FastAPI, TypeScript, React'],
];

const SECTIONS = [
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Contact', '#contact'],
] as const;

const CATEGORY_COLOR = {Vision: 'teal', NLP: 'purple', Data: 'blue', MLOps: 'orange', Apps: 'pink', Other: 'neutral'} as const;
const CATEGORIES = ['All', ...new Set(projects.map(p => p.category))];

type Mode = 'light' | 'dark';
const systemMode = (): Mode => (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function readMode(): Mode | null {
  try {
    const m = localStorage.getItem('mode');
    return m === 'light' || m === 'dark' ? m : null;
  } catch {
    return null;
  }
}

export default function App() {
  // null = follow the OS until the visitor picks a mode
  const [picked, setPicked] = useState<Mode | null>(readMode);
  const [system, setSystem] = useState<Mode>(systemMode);
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const on = () => setSystem(systemMode());
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const mode = picked ?? system;
  const narrow = useMediaQuery('(max-width: 640px)');
  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setPicked(next);
    try {
      localStorage.setItem('mode', next);
    } catch {
      // private mode: the choice just won't persist
    }
  };

  return (
    <Theme theme={themes[defaultThemeSlug]} mode={mode}>
      <Layout
        height="auto"
        contentWidth={1080}
        header={
          <LayoutHeader hasDivider padding={4}>
            <TopNav
              label="Main"
              heading={<TopNavHeading heading="Farid Rahimli" headingHref="#top" />}
              endContent={
                <HStack gap={1} vAlign="center">
                  {narrow ? (
                    <DropdownMenu
                      button={{label: 'Menu', variant: 'ghost'}}
                      items={SECTIONS.map(([label, hash]) => ({label, onClick: () => (location.hash = hash)}))}
                    />
                  ) : (
                    SECTIONS.map(([label, hash]) => <TopNavItem key={hash} label={label} href={hash} />)
                  )}
                  <IconButton
                    label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    tooltip={mode === 'dark' ? 'Light mode' : 'Dark mode'}
                    icon={<Icon icon={mode === 'dark' ? SunIcon : MoonIcon} />}
                    variant="ghost"
                    onClick={toggle}
                  />
                </HStack>
              }
            />
          </LayoutHeader>
        }
        content={
          <LayoutContent padding={6}>
            <VStack gap={10}>
              <Hero />
              <Featured />
              <AllProjects />
              <Divider />
              <About />
              <Divider />
              <Contact />
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter hasDivider padding={6}>
            <HStack gap={4} hAlign="between" wrap="wrap">
              <Text type="supporting">© {new Date().getFullYear()} Farid Rahimli</Text>
              <Text type="supporting">
                Projects synced from GitHub on{' '}
                {new Date(syncedAt).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}
              </Text>
            </HStack>
          </LayoutFooter>
        }
      />
    </Theme>
  );
}

function Hero() {
  return (
    <VStack gap={6}>
      <VStack gap={3}>
        <Heading level={1} type="display-2" id="top" textWrap="balance">
          Farid Rahimli
        </Heading>
        <Text type="large" textWrap="balance">
          Machine-learning engineer · MSc AI, Data Science and Digital Business
        </Text>
        <Text type="body" color="secondary" textWrap="pretty">
          I build machine-learning systems, taking problems from raw data to models people can use. Every project below
          shows its measured result, and coursework is labelled as coursework.
        </Text>
      </VStack>
      <HStack gap={3} wrap="wrap">
        <Button
          label="Download CV"
          variant="primary"
          href={CV}
          target="_blank"
          endContent={<Icon icon={ArrowDownTrayIcon} size="sm" color="inherit" />}
        />
        <Button label="Email me" href={`mailto:${EMAIL}`} />
        <Button label="GitHub" variant="ghost" href={GITHUB} target="_blank" />
        <Button label="LinkedIn" variant="ghost" href={LINKEDIN} target="_blank" />
      </HStack>
    </VStack>
  );
}

function Tags({p}: {p: Project}) {
  return (
    <HStack gap={2} wrap="wrap">
      <Badge label={p.category} variant={CATEGORY_COLOR[p.category]} />
      {p.coursework && <Badge label={p.coursework} />}
    </HStack>
  );
}

function ProjectLinks({p}: {p: Project}) {
  return (
    <HStack gap={4} wrap="wrap">
      <Link href={p.url} isExternalLink isStandalone>
        Code on GitHub
      </Link>
      {p.demo && (
        <Link href={p.demo} isExternalLink isStandalone>
          Live demo
        </Link>
      )}
    </HStack>
  );
}

function Metric({p}: {p: Project}) {
  return (
    <HStack gap={2} vAlign="end" wrap="wrap">
      <Text type="large" weight="semibold" hasTabularNumbers>
        {p.quote}
      </Text>
      {p.delta && <Text type="supporting">{p.delta}</Text>}
    </HStack>
  );
}

function Featured() {
  const featured = projects.filter(p => p.featured);
  return (
    <VStack gap={6}>
      <Heading level={2}>Featured work</Heading>
      <Grid columns={{minWidth: 300, max: 3}} gap={4}>
        {featured.map(p => (
          <Card key={p.repo} padding={6}>
            <VStack gap={4}>
              <Tags p={p} />
              <VStack gap={1}>
                <Heading level={3}>{p.title}</Heading>
                <Metric p={p} />
              </VStack>
              <Text type="body" color="secondary" textWrap="pretty">
                {p.summary}
              </Text>
              <VStack gap={1}>
                {p.results.map(r => (
                  <Text key={r} type="supporting" display="block">
                    · {r}
                  </Text>
                ))}
              </VStack>
              <HStack gap={1} wrap="wrap">
                {p.stack.map(s => (
                  <Token key={s} label={s} size="sm" />
                ))}
              </HStack>
              <ProjectLinks p={p} />
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

function AllProjects() {
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(
      p =>
        (tab === 'All' || p.category === tab) &&
        (!q || [p.title, p.tagline, p.summary, ...p.stack].some(s => s.toLowerCase().includes(q))),
    );
  }, [tab, search]);

  return (
    <VStack gap={6}>
      <Heading level={2} id="projects">
        All projects
      </Heading>
      <VStack gap={4}>
        <TextInput
          label="Search projects"
          isLabelHidden
          placeholder="Search by name, method or tool…"
          value={search}
          onChange={setSearch}
          startIcon={MagnifyingGlassIcon}
          size="lg"
        />
        <ToggleButtonGroup label="Filter by topic" value={tab} onChange={v => setTab(v ?? 'All')}>
          <OverflowList
            gap={1}
            behavior="observeParent"
            overflowRenderer={overflowItems => (
              <DropdownMenu
                button={{label: `+${overflowItems.length}`, variant: 'ghost', size: 'lg'}}
                items={overflowItems.map(({index}) => ({
                  label: CATEGORIES[index],
                  onClick: () => setTab(CATEGORIES[index]),
                }))}
              />
            )}>
            {CATEGORIES.map(cat => (
              <ToggleButton key={cat} label={cat} value={cat} size="lg" />
            ))}
          </OverflowList>
        </ToggleButtonGroup>
        <Text type="supporting" aria-live="polite">
          {filtered.length} of {projects.length} projects
        </Text>
      </VStack>

      {filtered.length === 0 ? (
        <Center>
          <VStack gap={3} hAlign="center">
            <Text type="supporting">No projects match “{search}”.</Text>
            <Button
              label="Clear filters"
              variant="ghost"
              onClick={() => {
                setSearch('');
                setTab('All');
              }}
            />
          </VStack>
        </Center>
      ) : (
        <Grid columns={{minWidth: 280, max: 3}} gap={4}>
          {filtered.map(p => (
            <Card key={p.repo} padding={4}>
              <VStack gap={3}>
                <Tags p={p} />
                <VStack gap={1}>
                  <Heading level={3}>{p.title}</Heading>
                  <Text type="supporting" textWrap="pretty">
                    {p.tagline}
                  </Text>
                </VStack>
                <Metric p={p} />
                <StackItem size="fill">
                  <HStack gap={1} wrap="wrap">
                    {p.stack.map(s => (
                      <Token key={s} label={s} size="sm" />
                    ))}
                  </HStack>
                </StackItem>
                <ProjectLinks p={p} />
              </VStack>
            </Card>
          ))}
        </Grid>
      )}
    </VStack>
  );
}

function About() {
  return (
    <VStack gap={6}>
      <Heading level={2} id="about">
        About
      </Heading>
      <Grid columns={{minWidth: 320, max: 2}} gap={8}>
        <VStack gap={4}>
          <Text type="body" textWrap="pretty">
            My public work covers computer vision for agriculture and wildlife conservation, retrieval-augmented
            generation over legal text, classification and forecasting on tabular data, NLP, and serverless ML
            pipelines on AWS.
          </Text>
          <Text type="body" textWrap="pretty">
            I care about honest evaluation, the trade-off between accuracy and cost, and systems that keep working after
            the notebook is closed.
          </Text>
        </VStack>
        <VStack gap={3}>
          <Heading level={3}>Toolkit</Heading>
          {TOOLKIT.map(([k, v]) => (
            <VStack key={k} gap={0.5}>
              <Text type="label">{k}</Text>
              <Text type="supporting">{v}</Text>
            </VStack>
          ))}
        </VStack>
      </Grid>
    </VStack>
  );
}

function Contact() {
  return (
    <VStack gap={4}>
      <Heading level={2} id="contact">
        Contact
      </Heading>
      <Text type="body" color="secondary">
        The fastest way to reach me is email.
      </Text>
      <Link href={`mailto:${EMAIL}`} size="2xl" weight="semibold" isStandalone>
        {EMAIL}
      </Link>
      <HStack gap={6} wrap="wrap">
        <Link href={LINKEDIN} isExternalLink isStandalone>
          LinkedIn
        </Link>
        <Link href={GITHUB} isExternalLink isStandalone>
          GitHub
        </Link>
        <Link href={CV} isExternalLink isStandalone>
          CV (PDF)
        </Link>
      </HStack>
    </VStack>
  );
}
