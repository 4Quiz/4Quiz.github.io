window.getLOLQuizData = function() {
  return [
    // ★ normal（基本問題）
    {
      difficulty: 'normal',
      question: '移動速度を10秒間24-48%増加させ、ユニットをすり抜けられるサモナースペルは？',
      choices: ['ゴースト', 'ヒール', 'フラッシュ', 'イグナイト'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '自身と味方1人のHPを回復し、移動速度も一時的に上昇させるサモナースペルは？',
      choices: ['ヒール', 'バリア', 'スマイト', 'ゴースト'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '2.5秒間、自身にシールドを付与するサモナースペルは？',
      choices: ['バリア', 'クレンズ', 'イグゾースト', 'マーク/ダッシュ'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '対象の敵にスロー効果と与ダメージ減少を与えるサモナースペルは？',
      choices: ['イグゾースト', 'ヒール', 'フラッシュ', 'スマイト'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '自身にかかっている多くのCCやイグゾースト効果を解除するサモナースペルは？',
      choices: ['クレンズ', 'ヒール', 'バリア', 'フラッシュ'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '指定地点にワープできる、汎用性の高いサモナースペルは？',
      choices: ['フラッシュ', 'テレポート', 'ゴースト', 'ヒール'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '10分経過後に使用可能になり、到着後移動速度も上昇するサモナースペルは？',
      choices: ['真テレポート', 'テレポート', 'フラッシュ', 'ゴースト'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '対象の敵に5秒間かけてTrueDMと負傷効果を与えるサモナースペルは？',
      choices: ['イグナイト', 'イグゾースト', 'クレンズ', 'フラッシュ'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: '大型モンスターに600または900のTrueDMを与えるジャングル向けサモナースペルは？',
      choices: ['スマイト', 'マーク/ダッシュ', 'テレポート', 'クラリティ'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: 'ダーク シールの効果は？',
      choices: ['敵チャンピオンキル時にスタックがたまる', 'ミニオンに追加ダメージ', 'HP回復効果', '防御力上昇'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: 'ドラン ブレードの効果は？',
      choices: ['ライフスティール効果を持つ', 'AP上昇', 'マナ回復', 'ワード設置'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: 'コントロール ワードの特徴は？',
      choices: ['破壊されるまで永続設置', '時間経過で消える', '透明化する', '味方だけ視認可能'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: 'ファーサイト オルタレーションの特徴は？',
      choices: ['遠距離からワード設置できる', 'ステルス検知', 'シールド付与', 'ミニオン即死'],
      answer: 0
    },
    {
      difficulty: 'normal',
      question: 'オラクル レンズの効果は？',
      choices: ['ステルスワードを可視化', '味方の攻撃速度増加', '自身の移動速度上昇', 'スキルクール短縮'],
      answer: 0
    },

    // ★ hard（やや知識必要問題）
    {
      difficulty: 'hard',
      question: 'スマイトの進化版で、敵チャンピオンにもSlow効果を与えるバージョンは？',
      choices: ['アンリーシュドスマイト', 'プライマルスマイト', '通常スマイト', 'フラッシュスマイト'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'スマイトのさらに強化版で、モンスター周囲にもダメージを与えるのは？',
      choices: ['プライマルスマイト', 'アンリーシュドスマイト', '通常スマイト', '強化スマイト'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'スマイトを持たないと購入できないアイテムは？',
      choices: ['ジャングルアイテム', 'ファーストアイテム', 'サポートアイテム', 'スターターアイテム'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'イグゾーストによる与ダメ減少効果は何%？',
      choices: ['35%', '40%', '20%', '50%'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'ゴーストの移動速度増加効果量は何に応じて決まる？',
      choices: ['レベル', '残りHP', 'マナ量', '攻撃力'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'フラッシュ使用後、事前に入力していたコマンドはどうなる？',
      choices: ['キャンセルされない', 'キャンセルされる', 'リセットされる', '無効化される'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'クレンズ使用後、CC効果時間が何%減少する？',
      choices: ['75%', '50%', '25%', '100%'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: 'テレポートの詠唱時間は何秒？',
      choices: ['4秒', '2秒', '5秒', '3秒'],
      answer: 0
    },
    {
      difficulty: 'hard',
      question: '至点のソリの効果は？',
      choices: ['移動妨害時に味方HPバフ', '追加物理ダメージ 通常攻撃時効果', 'ダメージ軽減とスロウ効果を付与', '追加魔法ダメージ'],
      answer: 0
    },
{
      difficulty: 'hard',
      question: 'ブラッドソングの効果は？',
      choices: ['移動妨害時に味方HPバフ', '追加物理ダメージ 通常攻撃時効果', 'ダメージ軽減とスロウ効果を付与', '追加魔法ダメージ'],
      answer: 0
    },
　　{
      difficulty: 'hard',
      question: 'セレスティアル オポジションの効果は？',
      choices: ['移動妨害時に味方HPバフ', '追加物理ダメージ', 'ダメージ軽減とスロウ効果を付与', '追加魔法ダメージ'],
      answer: 0
    },
　　{
      difficulty: 'hard',
      question: 'ドリーム メーカーの効果は？',
      choices: ['移動妨害時に味方HPバフ', '追加物理ダメージ', 'ダメージ軽減とスロウ効果を付与', '追加魔法ダメージ'],
      answer: 0
    },

    // ★ veryhard（戦術・高度な応用）
    {
      difficulty: 'veryhard',
      question: '「CCチェーン」を決める際に意識すべきことは？',
      choices: ['同時にすべてのスキルを撃つ', 'CC効果が重ならないように連続で当てる', '敵の逃走経路を作る', '味方と別々の敵を狙う'],
      answer: 1
    },
    {
      difficulty: 'veryhard',
      question: 'ミニオンウェーブを「スロー・プッシュ」する利点は？',
      choices: ['敵ジャングラーを誘き出せる', '自レーンでのオールイン勝負を狙いやすい', '味方タワーを守れる', 'タワーダイブの準備ができる'],
      answer: 3
    },
    {
      difficulty: 'veryhard',
      question: 'ブッシュにワードを置く理想的なタイミングは？',
      choices: ['ガンクを受けた後', 'レーンを押し込んだ直後', 'リコール後の移動中', '敵がいないタイミング'],
      answer: 1
    },
    {
      difficulty: 'veryhard',
      question: 'オールイン（全力交戦）を仕掛けるべき最も有利なタイミングは？',
      choices: ['自分のアルティメットが上がっている時', '敵がタワー下にいる時', 'ミニオンウェーブが自陣側にいる時', '敵に視界がある時'],
      answer: 0
    },
    {
      difficulty: 'veryhard',
      question: '敵に強力なエンゲージ（開戦）手段がある場合、最も安全な立ち回りは？',
      choices: ['味方と固まらず広がる', '密集して固まる', '敵ジャングルに入る', '真ん中を歩いて進軍する'],
      answer: 0
    },
  ];
};
