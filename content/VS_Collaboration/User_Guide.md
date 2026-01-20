---
title: "사용자 가이드"
---
# Antigravity Agent 사용 가이드

## 개요
이 문서는 구축된 **Git-CMS** 시스템을 Antigravity Agent가 어떻게 테스트하고 활용할 수 있는지 설명합니다.

## 시스템 접속 정보
- **Web UI:** `http://localhost:3000` (로컬 실행 시)
- **Git Repo:** `d:/Antigravity/VS_Collab` (루트가 Git 저장소 역할)

## 테스트 시나리오: 문서 Check-in / Check-out

### 1. Check-out (문서 읽기)
에이전트는 다음 두 가지 방법으로 문서를 읽을 수 있습니다.

#### 방법 A: 파일 시스템 직접 접근 (Local)
Antigravity는 로컬 파일 시스템에 접근 권한이 있으므로, 다음 경로의 파일을 직접 읽으면 됩니다.
- 경로: `d:/Antigravity/VS_Collab/content/`
- 예: `view_file d:/Antigravity/VS_Collab/content/index.mdx`

#### 방법 B: Web UI를 통한 접근 (Remote 시뮬레이션)
웹 브라우저를 통해 문서를 열람합니다.
1. `browser_subagent`를 호출합니다.
2. `http://localhost:3000/docs/index`로 이동합니다.
3. 페이지 내용을 읽습니다.

### 2. Check-in (문서 수정 및 저장)
수정한 내용을 시스템에 반영하는 방법입니다.

#### 방법 A: Web UI를 통한 저장 (추천)
가장 확실한 테스트 방법은 웹 인터페이스를 이용하는 것입니다.
1. 브라우저로 수정할 페이지로 이동합니다.
2. "Edit" 버튼을 누릅니다 (또는 에디터 영역 활성화).
3. 내용을 수정합니다.
4. "Save" 버튼을 클릭합니다.
   - **검증:** 성공 메시지가 뜨는지 확인합니다.
   - **검증:** `git log` 명령어로 실제 커밋이 생성되었는지 확인합니다.

#### 방법 B: Git 명령어로 직접 푸시
개발자 워크플로우를 시뮬레이션합니다.
1. `d:/Antigravity/VS_Collab/content/` 내의 파일을 `write_to_file`로 수정합니다.
2. `run_command`로 다음을 실행합니다:
   ```bash
   git add .
   git commit -m "docs: agent update"
   ```
3. Web UI에서 새로고침하여 반영되었는지 확인합니다.

## 문제 해결
- **Git 실행 환경:** 이 앱은 서버(로컬)에 `git` 실행 파일이 PATH에 등록되어 있어야 작동합니다. 현재 환경에서 `git --version`이 작동하는지 확인하세요.
- **PowerShell 권한 오류(PSSecurityException):** `npm` 실행 시 오류가 발생하면, 포함된 `run_app.bat` 파일을 더블클릭하여 실행하거나 CMD(명령 프롬프트)를 사용하세요.
- **Next.js 실행 실패:** `web/` 폴더에서 `npm install`이 제대로 되었는지 확인하세요.
- **Git 권한 오류:** 이 시스템은 로컬 실행을 가정하므로 별도 인증은 필요 없습니다. 단, `git config user.email` 설정이 되어 있어야 커밋이 가능합니다.
