import {Component, signal, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '../interfaces/exercise.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy, OnInit {
  public readonly timeLeft = signal('00:00');
  private currentTimer: any = null;

  public isPWAInstalled = false;
  public showInstallPrompt = false;
  private deferredPrompt: any;

  exercises: Exercise[] = [
    {
      id: 1,
      title: "Артикуляционная гимнастика",
      description: "Выполните комплекс упражнений для разминки речевого аппарата: движение языком в разные стороны, вытягивание губ, надувание щек.",
      duration: 30,
      timeLeft: 30,
      status: 'paused',
      completed: false
    },
    {
      id: 2,
      title: "Скороговорки - базовые",
      description: "Произнесите несколько раз: 'Шла Саша по шоссе и сосала сушку', 'Карл у Клары украл кораллы', 'На дворе трава, на траве дрова'.",
      duration: 45,
      timeLeft: 45,
      status: 'paused',
      completed: false
    },
    {
      id: 3,
      title: "Скороговорки - сложные",
      description: "Повторите быстро: 'Цапля чахла, цапля сохла, цапля сдохла', 'Бык тупогуб, тупогубенький бычок, у быка бела губа была тупа'.",
      duration: 50,
      timeLeft: 50,
      status: 'paused',
      completed: false
    },
    {
      id: 4,
      title: "Скороговорки - профессиональные",
      description: "Отточите произношение: 'Расскажите про покупки, про какие про покупки? Про покупки, про покупки, про покупочки мои'.",
      duration: 55,
      timeLeft: 55,
      status: 'paused',
      completed: false
    },
    {
      id: 5,
      title: "Чтение вслух - проза",
      description: "Прочитайте отрывок: 'Ветер гудел в проводах, завывал в трубах, стучал ставнями. Дождь хлестал в стекла, и казалось, что весь мир наполнился шумом и движением.'",
      duration: 60,
      timeLeft: 60,
      status: 'paused',
      completed: false
    },
    {
      id: 6,
      title: "Чтение вслух - поэзия",
      description: "Прочтите стихотворение: 'Буря мглою небо кроет, вихри снежные крутя; то, как зверь, она завоет, то заплачет, как дитя.' - А.С. Пушкин",
      duration: 40,
      timeLeft: 40,
      status: 'paused',
      completed: false
    },
    {
      id: 7,
      title: "Дикция с препятствием",
      description: "Произнесите сложные фразы с карандашом во рту, чтобы усилить работу артикуляционных мышц.",
      duration: 40,
      timeLeft: 40,
      status: 'paused',
      completed: false
    },
    {
      id: 8,
      title: "Интонационные упражнения",
      description: "Произнесите фразу 'Сегодня прекрасная погода' с разной интонацией: утвердительно, вопросительно, восклицательно, с сомнением, с радостью.",
      duration: 50,
      timeLeft: 50,
      status: 'paused',
      completed: false
    },
    {
      id: 9,
      title: "Сложные согласные - Ш, Ж, Щ",
      description: "Повторите: 'Шишка шуршала в шалаше', 'Жужжал жук, кружился жук', 'Щука щекочет щенка щеткой'.",
      duration: 35,
      timeLeft: 35,
      status: 'paused',
      completed: false
    },
    {
      id: 10,
      title: "Сложные согласные - Р, Л",
      description: "Произнесите: 'Рыба рыбачит, рак ракушку ищет', 'Лариса лилии поливала, лилии Ларисе улыбались'.",
      duration: 35,
      timeLeft: 35,
      status: 'paused',
      completed: false
    },
    {
      id: 11,
      title: "Скороговорки на скорость",
      description: "Попробуйте сказать максимально быстро: 'Тридцать три корабля лавировали, лавировали, да не вылавировали'.",
      duration: 45,
      timeLeft: 45,
      status: 'paused',
      completed: false
    },
    {
      id: 12,
      title: "Чтение сложного текста",
      description: "Прочтите научный текст: 'Квантовая суперпозиция представляет собой фундаментальный принцип квантовой механики, согласно которому квантовая система может находиться в нескольких состояниях одновременно.'",
      duration: 70,
      timeLeft: 70,
      status: 'paused',
      completed: false
    },
    {
      id: 13,
      title: "Эмоциональное чтение",
      description: "Прочитайте текст, передавая разные эмоции: радость, грусть, удивление, гнев, страх. Текст: 'Он вошел в комнату и увидел нечто невероятное...'",
      duration: 55,
      timeLeft: 55,
      status: 'paused',
      completed: false
    },
    {
      id: 14,
      title: "Скороговорки с цифрами",
      description: "Повторите: 'Два дровокола, два дроворуба, два дровокола говорили про дрова', 'Четыре черненьких чумазеньких чертенка чертили черными чернилами чертеж'.",
      duration: 50,
      timeLeft: 50,
      status: 'paused',
      completed: false
    },
    {
      id: 15,
      title: "Чтение скороговорок шепотом",
      description: "Произнесите сложные скороговорки шепотом, сохраняя четкость: 'Шла Саша по шоссе и сосала сушку', 'Карл у Клары украл кораллы'.",
      duration: 40,
      timeLeft: 40,
      status: 'paused',
      completed: false
    },
    {
      id: 16,
      title: "Дикция с улыбкой",
      description: "Произносите сложные фразы с широкой улыбкой: 'Прекрасная принцесса принесла приятный привет прилежным подданным'.",
      duration: 35,
      timeLeft: 35,
      status: 'paused',
      completed: false
    },
    {
      id: 17,
      title: "Скороговорки на дыхании",
      description: "Произнесите длинную скороговорку на одном выдохе: 'На мели мы налима лениво ловили, для меня вы нелимитно ловили налима'.",
      duration: 45,
      timeLeft: 45,
      status: 'paused',
      completed: false
    },
    {
      id: 18,
      title: "Чтение с выражением",
      description: "Прочтите басню: 'Ворона и Лисица' - И.А. Крылов. Передайте характеры персонажей через интонацию.",
      duration: 80,
      timeLeft: 80,
      status: 'paused',
      completed: false
    },
    {
      id: 19,
      title: "Сложные словосочетания",
      description: "Повторите: 'Флюорографист флюорографировал флюорографистку', 'Инцидент с интендантом инкриминирован интриганке'.",
      duration: 40,
      timeLeft: 40,
      status: 'paused',
      completed: false
    },
    {
      id: 20,
      title: "Темповое чтение",
      description: "Прочитайте текст, постепенно ускоряясь: 'Река течет, ветер веет, солнце светит, птицы поют. Природа пробуждается ото сна, и все вокруг наполняется жизнью и движением.'",
      duration: 50,
      timeLeft: 50,
      status: 'paused',
      completed: false
    },
    {
      id: 21,
      title: "Финальное комплексное упражнение",
      description: "Объедините все навыки: четкая артикуляция, правильное дыхание, эмоциональная окраска. Прочтите: 'О времена, о нравы! - воскликнул Цицерон. И действительно, в наше стремительное время особенно важно сохранять ясность мысли и четкость речи.'",
      duration: 90,
      timeLeft: 90,
      status: 'paused',
      completed: false
    }
  ];

  currentExerciseIndex = 0;

  ngOnInit() {
    this.checkPWAInstallation();
    this.setupInstallPrompt();
  }

  ngOnDestroy() {
    this.stopTimer();
    // Удаляем обработчики событий
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt.bind(this));
    window.removeEventListener('appinstalled', this.handleAppInstalled.bind(this));
  }

  // Проверка, установлено ли приложение как PWA
  private checkPWAInstallation(): void {
    // Проверка через display-mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isPWAInstalled = true;
      return;
    }

    // Проверка через navigator.standalone (для iOS)
    if ('standalone' in navigator && (navigator as any).standalone) {
      this.isPWAInstalled = true;
      return;
    }

    // Проверка через window.matchMedia для других браузеров
    if (window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches) {
      this.isPWAInstalled = true;
      return;
    }

    this.isPWAInstalled = false;
  }

  // Настройка обработчиков для PWA установки
  private setupInstallPrompt(): void {
    // Обработчик события beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt.bind(this));

    // Обработчик события успешной установки
    window.addEventListener('appinstalled', this.handleAppInstalled.bind(this));
  }

  private handleInstallPrompt(e: Event): void {
    // Предотвращаем автоматическое отображение подсказки
    e.preventDefault();

    // Сохраняем событие для использования позже
    this.deferredPrompt = e;

    // Показываем нашу кастомную кнопку установки
    this.showInstallPrompt = true;
  }

  private handleAppInstalled(): void {
    // Приложение было установлено
    this.isPWAInstalled = true;
    this.showInstallPrompt = false;
    this.deferredPrompt = null;

    console.log('PWA установлено!');
  }

  // Метод для установки PWA
  async installPWA(): Promise<void> {
    if (!this.deferredPrompt) {
      return;
    }

    // Показываем подсказку установки
    this.deferredPrompt.prompt();

    // Ждем ответа пользователя
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('Пользователь принял установку PWA');
      this.isPWAInstalled = true;
      this.showInstallPrompt = false;
    } else {
      console.log('Пользователь отклонил установку PWA');
    }

    // Очищаем ссылку на событие
    this.deferredPrompt = null;
  }

  // Остальные методы остаются без изменений
  get currentExercise(): Exercise {
    return this.exercises[this.currentExerciseIndex];
  }

  get hasPrevious(): boolean {
    return this.exercises.length > 1;
  }

  get hasNext(): boolean {
    return this.exercises.length > 1;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'paused':
        return 'Пауза';
      case 'running':
        return 'Выполняется';
      case 'completed':
        return 'Завершено';
      default:
        return '';
    }
  }

  private updateTimerDisplay(): void {
    if (this.currentExercise) {
      this.timeLeft.set(this.formatTime(this.currentExercise.timeLeft));
    }
  }

  private stopTimer(): void {
    if (this.currentTimer) {
      clearInterval(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private resetExerciseStatus(): void {
    if (this.currentExercise && !this.currentExercise.completed) {
      this.currentExercise.status = 'paused';
      this.currentExercise.timeLeft = this.currentExercise.duration;
    }
  }

  toggleExercise(): void {
    if (this.currentExercise.status === 'paused') {
      this.startExercise();
    } else if (this.currentExercise.status === 'running') {
      this.pauseExercise();
    }
  }

  private startExercise(): void {
    if (!this.currentExercise) return;
    this.stopTimer();

    this.currentExercise.status = 'running';
    this.updateTimerDisplay();

    this.currentTimer = setInterval(() => {
      this.currentExercise.timeLeft--;

      this.timeLeft.set(this.formatTime(this.currentExercise.timeLeft));

      if (this.currentExercise.timeLeft <= 0) {
        this.stopTimer();
        this.currentExercise.completed = true;
        this.currentExercise.status = 'completed';
      }
    }, 1000);
  }

  private pauseExercise(): void {
    if (this.currentTimer && this.currentExercise?.status === 'running') {
      this.stopTimer();
      this.currentExercise.status = 'paused';
    }
  }

  restartExercise(): void {
    this.stopTimer();

    if (!this.currentExercise) return;

    this.currentExercise.completed = false;
    this.currentExercise.timeLeft = this.currentExercise.duration;
    this.currentExercise.status = 'paused';

    this.updateTimerDisplay();
  }

  previousExercise(): void {
    this.stopTimer();
    this.resetExerciseStatus();

    this.currentExerciseIndex = this.currentExerciseIndex === 0
      ? this.exercises.length - 1
      : this.currentExerciseIndex - 1;

    this.exercises[this.currentExerciseIndex].status = 'paused';
    this.updateTimerDisplay();
  }

  nextExercise(): void {
    if (this.exercises.length === 0) return;

    this.stopTimer();
    this.resetExerciseStatus();

    this.currentExerciseIndex = this.currentExerciseIndex === this.exercises.length - 1
      ? 0
      : this.currentExerciseIndex + 1;

    this.exercises[this.currentExerciseIndex].status = 'paused';
    this.updateTimerDisplay();
  }
}
