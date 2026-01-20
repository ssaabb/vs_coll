# 디자인 시스템 가이드 (Design System Guide)
## Git-CMS UI/UX 명세서

이 문서는 AI 에이전트가 명시적인 지침에 따라 고품질의 UI를 구현할 수 있도록 **TailwindCSS** 기반의 디자인 토큰과 컴포넌트 스타일을 정의합니다.

### 1. 디자인 원칙 (Design Principles)
- **미니멀리즘 (Minimalism):** 불필요한 장식을 배제하고 콘텐츠에 집중합니다.
- **가독성 (Readability):** 긴 글을 읽기에 최적화된 줄 간격과 폰트 크기를 사용합니다.
- **피드백 (Feedback):** 모든 상호작용(저장, 동기화, 에러)에 대해 명확한 시각적 피드백을 제공합니다.

### 2. 컬러 팔레트 (Color Palette) - TailwindCSS
전체적인 톤은 'Slate'를 사용하여 차분하고 전문적인 느낌을 줍니다.

- **Background:** `bg-slate-50` (앱 배경), `bg-white` (카드/패널)
- **Primary Action:** `bg-indigo-600` hover: `bg-indigo-700` text: `white`
- **Text:**
  - Headings: `text-slate-900`
  - Body: `text-slate-600`
  - Muted: `text-slate-400`
- **Border:** `border-slate-200`
- **Status:**
  - Success: `text-emerald-600`, `bg-emerald-50`
  - Warning: `text-amber-600`, `bg-amber-50`
  - Error: `text-rose-600`, `bg-rose-50`

### 3. 타이포그래피 (Typography)
- **Font Family:** `Inter`, `Pretendard`, 또는 시스템 기본 산세리프.
- **Scale:**
  - `h1`: `text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl`
  - `h2`: `text-2xl font-semibold tracking-tight text-slate-900`
  - `h3`: `text-xl font-semibold text-slate-900`
  - `body`: `text-base leading-7 text-slate-600` (최적의 가독성을 위한 `leading-7`)
  - `code`: `font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded text-slate-800`

### 4. 핵심 컴포넌트 명세 (Core Component Specs)

#### 4.1 사이드바 (Sidebar)
- **Layout:** `w-64 border-r border-slate-200 bg-white h-screen fixed left-0 top-0 overflow-y-auto`
- **Item:** `flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900`
- **Active Item:** `bg-indigo-50 text-indigo-700`

#### 4.2 메인 콘텐츠 영역 (Main Content)
- **Layout:** `ml-64 p-8 max-w-4xl mx-auto`
- **Paper Effect:** 문서는 종이 질감을 낼 필요는 없으나, 깨끗한 배경 위에서 읽혀야 합니다.

#### 4.3 버튼 (Buttons)
- **Base:** `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none`
- **Variants:**
  - **Default (Primary):** `bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2`
  - **Outline (Secondary):** `border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2`
  - **Ghost (Icon only):** `hover:bg-slate-100 h-10 w-10`

### 5. 프롬프트 엔지니어링 팁 (For Agents)
다른 에이전트에게 UI 구현을 지시할 때 다음 문구를 포함하세요:
> "모든 UI 요소는 `shadcn/ui` 스타일의 세련되고 Modern한 룩앤필을 가져야 합니다. TailwindCSS의 `ring`, `shadow-sm`, `rounded-lg` 등을 적절히 사용하여 깊이감을 주고, 투박한 기본 테두리를 피하세요."
