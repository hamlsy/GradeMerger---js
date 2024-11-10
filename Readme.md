# GradeMerger Game
# 📚 Grade Merger 성적 합치기 게임

## License 라이센스
This project makes use of the following open-source projects:
- **[suika game](https://github.com/kairess/suika-game)**  

## 실행 방법
```
npm run dev
```
이후 localhost 주소 접속

## 🇰🇷 한글 버전

### 🎮 게임 소개
자바스크립트로 제작된 '성적 합치기' 게임에 오신 것을 환영합니다! 같은 성적을 합쳐 A+ 3개를 모으는 것이 목표입니다!

### 📋 기본 규칙
- **성적 단계**: F → D → C → B → A → A+
- **합치기 규칙**: 같은 성적이 만나면 한 단계 위의 성적으로 변환
- **승리 조건**: A+ 3개 모으기
- **게임 오버**: 성적이 GameOver 라인을 넘어갈 경우

### 🌟 스테이지

#### 🎯 스테이지 1: 기본 모드
- 기본적인 합치기 규칙만 적용됩니다.
- 특별한 아이템이나 시간 제약은 없습니다.
- 초보자에게 적합합니다!

#### 💫 스테이지 2: 아이템 모드
랜덤으로 등장하는 특별 아이템:
- A 미만의 성적에만 영향을 줍니다.
- 📝 **과제 아이템**
  - 닿은 성적을 한 단계 낮춥니다.
- 💣 **폭탄 아이템**
  - 닿은 성적을 제거합니다.

#### ⚡ 스테이지 3: 타임어택
- 20초마다 지진과 함께 ground가 상승합니다.
- 상승하는 Ground로 인해 성적들이 GameOver 라인에 도달하기 전에 클리어해야 합니다.
- 빠른 판단력과 순발력이 필요합니다!

### 🎉 즐거운 게임 되세요!

## 🇺🇸 English Version

### 🎮 Game Overview
Welcome to Grade Merger, an exciting JavaScript-based puzzle game where your goal is to collect three A+ grades by merging similar grades together!

### 📋 Basic Rules
- **Grade Hierarchy**: F → D → C → B → A → A+
- **Merging Mechanism**: When identical grades meet, they combine to form the next higher grade
- **Victory Condition**: Collect three A+ grades
- **Game Over**: If any grade crosses the GameOver line

### 🌟 Stages

#### 🎯 Stage 1: Basic Mode
- Simple merging mechanics
- No special items or time constraints
- Perfect for beginners!

#### 💫 Stage 2: Item Mode
Special items appear randomly:
- Only affects grades below A
- 📝 **Task Item**
  - Decreases grade by one level when touched
- 💣 **Bomb Item**
  - Removes the grade it touches completely

#### ⚡ Stage 3: Time Attack
- Ground rises every 20 seconds with earthquake effects
- Race against time before the ground reaches the GameOver line
- Quick thinking and fast merging required!

---