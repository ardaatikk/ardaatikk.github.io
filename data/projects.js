const projects = [
  {
    id: "histopathology-cancer-detection",
    title: "Histopathology Cancer Detection",
    description: {
      en: "Deep learning system for detecting metastatic regions in lymph node histopathology images with explainable AI.",
      tr: "Lenf nodu histopatoloji görüntülerinde metastatik bölgeleri açıklanabilir yapay zeka ile tespit eden derin öğrenme sistemi."
    },
    tags: ["Python", "PyTorch", "ResNet-18", "Computer Vision", "Grad-CAM"],
    repo: "histopathology-cancer-detection",
    featured: true,
    order: 1
  },
  {
    id: "ai4i-machine-failure-prediction",
    title: "AI4I Machine Failure Prediction",
    description: {
      en: "Machine learning pipeline for industrial machine-failure prediction and operational risk analysis.",
      tr: "Endüstriyel makine arızalarını tahmin etmek ve operasyonel riski analiz etmek için makine öğrenmesi hattı."
    },
    tags: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
    repo: "ai4i-machine-failure-prediction",
    featured: true,
    order: 2
  },
  {
    id: "fraud-detection-ml-api",
    title: "Fraud Detection ML API",
    description: {
      en: "End-to-end fraud detection system exposing machine-learning predictions through a containerized API.",
      tr: "Makine öğrenmesi tahminlerini container tabanlı bir API üzerinden sunan uçtan uca dolandırıcılık tespit sistemi."
    },
    tags: ["Python", "Machine Learning", "FastAPI", "Docker", "API"],
    repo: "fraud-detection-ml-api",
    featured: true,
    order: 3
  },
  {
    id: "glass-bottle-inspection",
    title: "Glass Bottle Inspection",
    description: {
      en: "Computer-vision and data-analysis work for automated glass-bottle inspection.",
      tr: "Otomatik cam şişe denetimi için bilgisayarlı görü ve veri analizi çalışması."
    },
    tags: ["Python", "Computer Vision", "Data Analysis"],
    repo: "glass-bottle-inspection",
    featured: true,
    order: 4
  },
  {
    id: "stroke-prediction",
    title: "Stroke Prediction",
    description: {
      en: "Machine-learning classification project for stroke-risk prediction using structured healthcare data.",
      tr: "Yapılandırılmış sağlık verileriyle inme riski tahmini için makine öğrenmesi sınıflandırma projesi."
    },
    tags: ["Python", "Scikit-learn", "Classification", "Data Analysis"],
    repo: "stroke-prediction",
    featured: false,
    order: 5
  }
];
