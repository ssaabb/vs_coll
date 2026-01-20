---
title: "배포 가이드 (Deployment)"
---
# 배포 및 Git 업로드 가이드 (User Guide: Deployment)

이 문서는 로컬에서 개발된 **Git-CMS** 시스템을 **GitHub**에 업로드하고, **Vercel**을 통해 무료로 배포하는 방법을 단계별로 설명합니다.

## 1. 사전 준비 (Prerequisites)
- **GitHub 계정**이 필요합니다.
- **Vercel 계정**이 필요합니다 (GitHub 아이디로 가입 가능).
- 로컬 컴퓨터에 **Git**이 설치되어 있어야 합니다. (현재 로컬 Git이 설치되지 않은 경우 [Git 설치 링크](https://git-scm.com/downloads)에서 먼저 설치하세요).

## 2. GitHub에 프로젝트 업로드

### 2.1 저장소(Repository) 생성
1.  GitHub 웹사이트에 로그인합니다.
2.  우측 상단의 `+` 버튼을 누르고 **New repository**를 클릭합니다.
3.  Repository name에 `Git-CMS` (또는 원하는 이름)를 입력합니다.
4.  Public/Private 중 하나를 선택하고 **Create repository**를 클릭합니다.

### 2.2 로컬 프로젝트 연결 및 푸시
로컬 터미널(CMD 또는 PowerShell)을 열고, 프로젝트 폴더(`d:\Antigravity\VS_Collab`)로 이동하여 다음 명령어를 순서대로 입력합니다.

```bash
# 1. 현재 폴더를 Git 저장소로 초기화 (이미 되어 있다면 생략)
git init

# 2. 모든 파일 스테이징
git add .

# 3. 초기 커밋
git commit -m "feat: initial commit not deploy ready"

# 4. GitHub 저장소와 연결 (URL은 본인의 리포지토리 주소로 변경)
git remote add origin https://github.com/YOUR_ID/Git-CMS.git

# 5. 메인 브랜치 설정 및 푸시
git branch -M main
git push -u origin main
```
> **주의:** 로그인 창이 뜨면 GitHub 아이디/비번(또는 토큰)으로 로그인하세요.

### 🚨 트러블슈팅: "Dubious Ownership" 에러가 뜬다면?
만약 `fatal: detected dubious ownership in repository...` 라는 에러가 나온다면, 아래 명령어를 터미널에 입력하여 이 폴더를 신뢰할 수 있는 경로로 등록해주세요.

```bash
git config --global --add safe.directory D:/Antigravity/VS_Collab
```
(이후 위 `git add .` 단계부터 다시 진행하세요.)

## 3. Vercel 배포

### 3.1 Vercel 프로젝트 생성
1.  [Vercel Dashboard](https://vercel.com/dashboard)로 이동합니다.
2.  **Add New...** > **Project**를 클릭합니다.
3.  **Import Git Repository**에서 방금 올린 `Git-CMS` 옆의 **Import** 버튼을 누릅니다.

### 3.2 배포 설정 (중요!)
Vercel 설정 화면에서 다음 두 가지를 **반드시** 확인하고 수정해야 합니다.

1.  **Framework Preset:** `Next.js` (자동 감지됨)
2.  **Root Directory:** `Edit` 버튼을 누르고 **`web`** 폴더를 선택합니다.
    -   *이유:* Next.js 애플리케이션 코드가 루트가 아닌 `web` 폴더 안에 있기 때문입니다.

3.  **Deploy** 버튼을 클릭합니다.

### 4. 배포 후 확인
배포가 완료되면 Vercel이 제공하는 도메인(예: `git-cms.vercel.app`)으로 접속합니다.
- 사이드바 메뉴가 잘 나오는지 확인합니다.
- 문서들이 잘 열리는지 확인합니다.

> **참고:** Vercel에 배포된 버전은 "읽기 전용(Read-Only)"에 가깝습니다. 웹에서 문서를 수정하여 "Save"를 눌러도, 실제 GitHub 저장소에는 반영되지 않을 수 있습니다 (Vercel 서버는 임시 저장소이기 때문). 
> **완전한 기능(양방향 동기화)**을 위해서는, 향후 백엔드 API가 GitHub API를 직접 호출하도록 `Check-in` 로직을 고도화해야 합니다. (현재 로직은 로컬 파일 시스템 쓰기 방식)
