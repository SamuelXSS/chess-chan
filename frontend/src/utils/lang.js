import React from 'react';

const langs = {
  en: {
    chessUsername: {
      title: 'Chess.com username',
      description: <p className="description">Your <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a> username.</p>,
    },
    queueSize: {
      title: 'Maximum queue size (optional)',
      description:
        'Here you can define the maximum queue size, if needed. Leave empty for no limit.',
    },
    languageChoice: {
      title: 'Language',
      description: 'Select the preferred language.',
    },
    gameModeChoice: {
      title: 'Queue mode',
      description: 'You can choose the queue mode (it can be changed later).'
    },
    savePreferences: 'Save settings',
  },
  pt_br: {
    chessUsername: {
      title: 'Nome de usuário no Chess.com',
      description: <p className="description">Seu nome de usuário no <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>.</p>,
    },
    queueSize: {
      title: 'Tamanho máximo da fila (opcional)',
      description:
        'Aqui você pode definir o tamanho máximo da fila, se necessário. Deixe vazio para sem limite.',
    },
    languageChoice: {
      title: 'Idioma',
      description: 'Selecione o idioma preferido.',
    },
    savePreferences: 'Salvar configurações',
  },
  es: {
    chessUsername: {
      title: 'Nombre de usuario en Chess.com',
      description: <p className="description">Tu nombre de usuario en <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>.</p>,
    },
    queueSize: {
      title: 'Tamaño máximo de la cola (opcional)',
      description:
        'Aquí puedes definir el tamaño máximo de la cola, si es necesario. Deja en blanco para sin límite.',
    },
    languageChoice: {
      title: 'Idioma',
      description: 'Selecciona el idioma preferido.',
    },
    savePreferences: 'Guardar configuraciones',
  },
  fr: {
    chessUsername: {
      title: "Nom d'utilisateur Chess.com",
      description: <p className="description">Votre nom d'utilisateur <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>.</p>,
    },
    queueSize: {
      title: 'Taille maximale de la file d\'attente (facultatif)',
      description:
        'Vous pouvez définir la taille maximale de la file d\'attente, si nécessaire. Laissez vide pour aucune limite.',
    },
    languageChoice: {
      title: 'Langue',
      description: 'Sélectionnez la langue préférée.',
    },
    savePreferences: 'Enregistrer les configurations',
  },
  de: {
    chessUsername: {
      title: 'Chess.com-Benutzername',
      description: <p className="description">Dein <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>-Benutzername.</p>,
    },
    queueSize: {
      title: 'Maximale Warteschlangengröße (optional)',
      description:
        'Hier kannst du die maximale Warteschlangengröße festlegen, falls erforderlich. Leer lassen für keine Begrenzung.',
    },
    languageChoice: {
      title: 'Sprache',
      description: 'Wähle die bevorzugte Sprache aus.',
    },
    savePreferences: 'Konfigurationen speichern',
  },
  zh_cn: {
    chessUsername: {
      title: 'Chess.com 用户名',
      description: <p className="description">你的 <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a> 用户名。</p>,
    },
    queueSize: {
      title: '最大队列大小（可选）',
      description:
        '如果需要，您可以在这里定义最大队列大小。留空表示没有限制。',
    },
    languageChoice: {
      title: '语言',
      description: '选择首选语言。',
    },
    savePreferences: '保存配置',
  },
  ja: {
    chessUsername: {
      title: 'Chess.com ユーザー名',
      description: <p className="description">あなたの <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a> ユーザー名。</p>,
    },
    queueSize: {
      title: '最大キューサイズ（オプション）',
      description:
        '必要に応じてここで最大キューサイズを定義できます。制限なしの場合は空白のままにしてください。',
    },
    languageChoice: {
      title: '言語',
      description: '優先言語を選択します。',
    },
    savePreferences: '設定を保存',
  },
  ko: {
    chessUsername: {
      title: 'Chess.com 사용자 이름',
      description: <p className="description">당신의 <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a> 사용자 이름.</p>,
    },
    queueSize: {
      title: '최대 대기열 크기 (선택 사항)',
      description:
        '필요한 경우 최대 대기열 크기를 여기에 정의할 수 있습니다. 제한 없음을 위해 비워 두세요.',
    },
    languageChoice: {
      title: '언어',
      description: '선호하는 언어를 선택하세요.',
    },
    savePreferences: '구성 저장',
  },
  ru: {
    chessUsername: {
      title: 'Имя пользователя Chess.com',
      description: <p className="description">Ваше имя пользователя <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>.</p>,
    },
    queueSize: {
      title: 'Максимальный размер очереди (по желанию)',
      description:
        'Здесь вы можете задать максимальный размер очереди, если это необходимо. Оставьте пустым для отсутствия ограничений.',
    },
    languageChoice: {
      title: 'Язык',
      description: 'Выберите предпочитаемый язык.',
    },
    savePreferences: 'Сохранить конфигурацию',
  },
  ar: {
    chessUsername: {
      title: 'اسم مستخدم Chess.com',
      description: <p className="description">اسم المستخدم الخاص بك في <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a>.</p>,
    },
    queueSize: {
      title: 'الحجم الأقصى للطابور (اختياري)',
      description:
        'هنا يمكنك تحديد الحجم الأقصى للطابور، إذا كان ذلك ضروريًا. اتركه فارغًا لعدم وجود حدود.',
    },
    languageChoice: {
      title: 'اللغة',
      description: 'حدد اللغة المفضلة.',
    },
    savePreferences: 'حفظ الإعدادات',
  },
  hi: {
    chessUsername: {
      title: 'Chess.com उपयोगकर्ता नाम',
      description: <p className="description">आपका <a href="https://chess.com/settings" target="_blank" style={{ color: "#a970ff" }}>chess.com</a> उपयोगकर्ता नाम।</p>,
    },
    queueSize: {
      title: 'अधिकतम कतार आकार (वैकल्पिक)',
      description:
        'यहाँ आप अधिकतम कतार आकार को विशिष्ट कर सकते हैं, यदि आवश्यक हो। कोई सीमा निर्धारित नहीं करने के लिए खाली छोड़ दें।',
    },
    languageChoice: {
      title: 'भाषा',
      description: 'पसंदीदा भाषा का चयन करें।',
    },
    savePreferences: 'समाकृतियों को सुरक्षित करें',
  },
};

export default langs;