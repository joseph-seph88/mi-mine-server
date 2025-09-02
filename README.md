# MiMine Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[![Node.js Version](https://img.shields.io/badge/node.js-v23.3.0-green.svg)](https://nodejs.org/)
[![NestJS Version](https://img.shields.io/badge/nestjs-v11.0.7-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)]()

## 📋 프로젝트 정보

**Mi-Mine**은 **Clean Architecture** 패턴을 적용한 NestJS 기반의 백엔드 서버입니다.

- **개발자**: Joseph88
- **아키텍처**: Clean Architecture (클린 아키텍처)
- **프레임워크**: NestJS
- **언어**: TypeScript
- **목적**: 확장 가능하고 유지보수하기 쉬운 서버 구조 구현

### 🛠 기술 스택

#### 핵심 기술
- **Node.js**: v23.3.0 (런타임 환경)
- **NestJS**: v11.0.7 (프레임워크)
- **TypeScript**: v5.7.3 (언어)
- **Package Manager**: npm v11.0.0

#### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Jest**: 테스트 프레임워크
- **SWC**: 빠른 TypeScript 컴파일러

#### 주요 라이브러리
- **class-validator**: DTO 유효성 검사
- **class-transformer**: 객체 변환
- **reflect-metadata**: 메타데이터 리플렉션

### 🏗 아키텍처 구조

```
src/
├── domain/                    # 🎯 도메인 레이어 (비즈니스 로직)
│   ├── entities/             # 엔티티 (User 등)
│   ├── repositories/         # 레포지토리 인터페이스
│   ├── usecases/            # 유스케이스 (CreateUserUseCase 등)
│   └── domain.module.ts     # 도메인 모듈
├── application/              # 🔄 애플리케이션 레이어
│   ├── services/            # 애플리케이션 서비스
│   ├── dtos/               # 데이터 전송 객체
│   ├── mappers/            # 매퍼 (엔티티 ↔ DTO)
│   └── application.module.ts
├── infrastructure/          # 🏭 인프라스트럭처 레이어
│   ├── repositories/       # 레포지토리 구현체
│   ├── external-services/  # 외부 서비스 (이메일 등)
│   ├── config/            # 설정
│   └── infrastructure.module.ts
└── presentation/           # 🎨 프레젠테이션 레이어
    ├── controllers/       # 컨트롤러
    ├── middlewares/      # 미들웨어
    ├── guards/          # 가드
    ├── interceptors/    # 인터셉터
    └── presentation.module.ts
```
