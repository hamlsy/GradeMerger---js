# GradeMerger Game
# 📚 Grade Merger 성적 합치기 게임

## License 라이센스
This project makes use of the following open-source projects:
- **[suika game](https://github.com/kairess/suika-game)**  

## 실행 방법 how to play

go to [https://hamlsy.github.io/GradeMerger-js/]

or 

```
npm run dev
```
이후 localhost 주소 접속

## 게임 개요

### 🎮 게임 소개 Game Overview
자바스크립트로 제작된 '성적 합치기' 게임에 오신 것을 환영합니다! 같은 성적을 합쳐 A+ 3개를 모으는 것이 목표입니다!

Welcome to Grade Merger, an exciting JavaScript-based puzzle game where your goal is to collect three A+ grades by merging similar grades together!

### 📋 기본 규칙 Basic Rules
- **성적 단계**: F → D → C → B → A → A+
- **합치기 규칙**: 같은 성적이 만나면 한 단계 위의 성적으로 변환
- **승리 조건**: A+ 3개 모으기
- **게임 오버**: 성적이 GameOver 라인을 넘어갈 경우

- **Grade Hierarchy**: F → D → C → B → A → A+
- **Merging Mechanism**: When identical grades meet, they combine to form the next higher grade
- **Victory Condition**: Collect three A+ grades
- **Game Over**: If any grade crosses the GameOver line

### 🌟 스테이지 Stages

#### 🎯 스테이지 1: 기본 모드 Stage 1: Basic Mode
- 기본적인 합치기 규칙만 적용됩니다.
- 특별한 아이템이나 시간 제약은 없습니다.
- 초보자에게 적합합니다!

- Simple merging mechanics
- No special items or time constraints
- Perfect for beginners!

#### 💫 스테이지 2: 아이템 모드 Stage 2: Item Mode
랜덤으로 등장하는 특별 아이템:
- A 미만의 성적에만 영향을 줍니다.
- 📝 **과제 아이템**
  - 닿은 성적을 한 단계 낮춥니다.
- 💣 **폭탄 아이템**
  - 닿은 성적을 제거합니다.

Special items appear randomly:
- Only affects grades below A
- 📝 **Task Item**
  - Decreases grade by one level when touched
- 💣 **Bomb Item**
  - Removes the grade it touches completely

#### ⚡ 스테이지 3: 타임어택 Stage 3: Time Attack
- 20초마다 지진과 함께 ground가 상승합니다.
- 상승하는 Ground로 인해 성적들이 GameOver 라인에 도달하기 전에 클리어해야 합니다.
- 빠른 판단력과 순발력이 필요합니다!

- Ground rises every 20 seconds with earthquake effects
- Race against time before the ground reaches the GameOver line
- Quick thinking and fast merging required!


### 메인 화면
![image](https://github.com/user-attachments/assets/72a5e980-496d-4160-a00b-75cb5908999d)


### 튜토리얼
![image](https://github.com/user-attachments/assets/81baedc9-c38a-4c53-852b-c6c8da5e827c)


### 스테이지 선택
![image](https://github.com/user-attachments/assets/d990e38c-efd3-4710-b615-24b44b9009d1)

### Stage 1
![image](https://github.com/user-attachments/assets/d064932c-bdf9-4f08-b7d4-f9c0f51bb3d8)
![image](https://github.com/user-attachments/assets/27eb9748-352a-4c4d-a743-c0bbb789e9ec)


### Stage 2
![image](https://github.com/user-attachments/assets/bbde18fb-afeb-4a69-97f5-9ac2cdba09b9)
![image](https://github.com/user-attachments/assets/98470f79-0933-48c2-a222-dc9036252cac)


### Stage 3
![image](https://github.com/user-attachments/assets/9d1594ce-0c95-4347-87b3-06379f4cf912)
![image](https://github.com/user-attachments/assets/6fedfdd0-06ae-4fa1-8caa-3b7904f8b134)


### Game over
![image](https://github.com/user-attachments/assets/3727fd70-06b3-49e4-a632-c7da85f9c72f)


### Win
![image](https://github.com/user-attachments/assets/03186be4-d00f-4822-9d89-e2bea72ba00d)


## 🎉 즐거운 게임 되세요!
