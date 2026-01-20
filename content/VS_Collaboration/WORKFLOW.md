---
title: "개발 워크플로우 (Workflow)"
---
# 프로젝트 개발 워크플로우 (Development Workflow)

## 개요
본 문서는 Git-CMS 프로젝트의 전체적인 문서화 및 개발 생명주기(Lifecycle)를 정의합니다.

## 워크플로우 다이어그램 (Workflow Diagram)

```mermaid
flowchart TD
    %% Nodes
    Req[1. Requirement 문서 작성]
    PRD[2. PRD 작성]
    TRD[3. TRD 작성]
    Build[4. 구축/개발 (Implementation)]
    Guide[5. User Guide 작성]
    
    UserReq[6. 사용자 변경 요구사항]
    
    UpdateReq[7-1. Requirement 문서 반영]
    UpdateSpecs[7-2. PRD/TRD 수정]
    
    UpdateDev[8-1. 변경 개발]
    UpdateGuide[8-2. User Guide 업데이트]

    %% Flow (Initial)
    Start((시작)) --> Req
    Req --> PRD
    PRD --> TRD
    TRD --> Build
    Build --> Guide
    Guide --> Done((운영 중))

    %% Flow (Feedback Loop)
    Done -.->|피드백발생| UserReq
    UserReq --> UpdateReq
    UpdateReq --> UpdateSpecs
    UpdateSpecs --> UpdateDev
    UpdateDev --> UpdateGuide
    UpdateGuide --> Done

    %% Styling
    classDef doc fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef dev fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef user fill:#fff3e0,stroke:#e65100,stroke-width:2px,stroke-dasharray: 5 5;

    class Req,PRD,TRD,Guide,UpdateReq,UpdateSpecs,UpdateGuide doc;
    class Build,UpdateDev dev;
    class UserReq user;
```

## 상세 단계 (Step-by-Step)

### 1단계: 초기 구축 (Initial Setup)
1.  **Requirement 문서 작성:** 사용자의 초기 요구사항을 분석하여 `Requirements.md`를 작성합니다.
2.  **PRD 작성:** 제품의 기능적/비기능적 요구사항을 정의하여 `PRD.md`를 작성합니다.
3.  **TRD 작성:** 기술 스택, 아키텍처, 데이터 모델 등을 설계하여 `TRD.md`를 작성합니다.
4.  **구축 (Implementation):** 설계된 스펙에 따라 실제 시스템을 개발합니다.
5.  **User Guide 작성:** 최종 사용자를 위한 매뉴얼 `User_Guide.md`를 작성합니다.

### 2단계: 유지보수 및 반복 (Iteration)
6.  **사용자 변경 요구사항:** 운영 중 사용자가 새로운 기능이나 수정을 요청합니다.
7.  **문서 업데이트 (Spec Update):**
    -   `Requirements.md`에 변경 사항을 누적 기록합니다.
    -   변경된 요구사항에 맞춰 `PRD.md`와 `TRD.md`를 정합성 있게 수정합니다.
8.  **개발 및 가이드 갱신:**
    -   변경된 스펙대로 코드를 수정(Refactoring/Feat)합니다.
    -   기능 변경에 따라 `User_Guide.md`를 최신화합니다.
