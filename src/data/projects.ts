export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  links: {
    website?: string;
    github?: string;
    demo?: string;
    docker?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'calunite',
    name: 'CalUnite',
    description:
      'Merge and Serve ICS iCalendars (RFC 5545) via Docker. Automatic order detection, hot reload, optimized container footprint.',
    icon: 'lucide:calendar-sync',
    links: {
      github: 'https://github.com/Jojodicus/calunite',
      docker: 'https://hub.docker.com/r/jojodicus/calunite',
    },
  },
  {
    id: 'liveboot',
    name: 'Liveboot',
    description:
      'A fast, friendly and powerful rescue-tool, based on NixOS. Wide support for hardware, easy to use. Coming soon.',
    icon: 'lucide:feather',
    links: {
      website: 'https://liveboot.org/',
      github: 'https://github.com/liveboot',
    },
  },
  {
    id: 'bhw-bot',
    name: 'BHW Discord Bot',
    description:
      "Smart helper bot for the Ben's Hardware Discord Community. Supercharged with message processing, OCR and AI integration.",
    icon: 'lucide:bot',
    links: {
      github: 'https://github.com/Jojodicus/bhw-dc-bot',
    },
  },
  {
    id: 'qr2eascii',
    name: 'qr2eascii',
    description:
      'Generate/convert a QR-code in E-ASCII-art. Supports image input, as well as multiple compression and error correction configurations.',
    icon: 'lucide:qr-code',
    links: {
      github: 'https://github.com/Jojodicus/qr2eascii',
    },
  },
];
