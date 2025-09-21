# MiMine Server

Clean Architecture 패턴을 적용한 NestJS 기반 백엔드 서버

**개발자**: Joseph88  
**연락처**: pathetic.sim@gmail.com

## 기술 스택

- **Node.js**: v23.3.0
- **NestJS**: v11.0.7
- **TypeScript**: v5.7.3
- **PostgreSQL**: Database
- **Redis**: Cache
- **TypeORM**: ORM
- **JWT**: Authentication

## 아키텍처

### Clean Architecture 구조

```
src/
├── modules/                   # 비즈니스 모듈
│   ├── auth/                  # 인증 시스템
│   ├── user/                  # 사용자 관리
│   ├── post/                  # 게시글 시스템
│   └── comment/               # 댓글/대댓글 시스템
└── shared/                    # 공통 모듈
```

각 모듈은 4개 레이어로 구성:

- **Domain Layer** - 비즈니스 규칙과 엔티티
- **Infrastructure Layer** - 데이터베이스, 외부 서비스
- **Application Layer** - 유스케이스, 서비스
- **Presentation Layer** - 컨트롤러, DTO

### 설계 이유

1. **Clean Architecture 적용**
   - 의존성 역전 원칙으로 테스트 용이성 확보
   - 비즈니스 로직과 인프라 분리로 유지보수성 향상
   - 모듈 간 결합도 최소화

2. **Self-Referencing 댓글 구조**
   - 무한 중첩 대댓글 지원
   - 단일 테이블로 복잡한 계층 구조 관리

3. **성능 최적화**
   - Redis 캐싱으로 응답 속도 향상
   - 페이지네이션으로 대용량 데이터 처리
   - 지연 로딩으로 초기 로딩 시간 단축

## 핵심 기능

- JWT 기반 인증 시스템
- 게시글 CRUD + 위치 기반 조회
- 댓글/대댓글 시스템 (Self-Referencing)
- Swagger API 문서화