export const HROMADAS = [
  { id: 'makariv', name: 'Макарівська', center: [50.465, 29.828], zoom: 12 },
  { id: 'irpin', name: 'Ірпінська', center: [50.521, 30.244], zoom: 13 },
  { id: 'drohobych', name: 'Дрогобицька', center: [49.349, 23.506], zoom: 13 },
  { id: 'kamianets', name: 'Кам\'янець-Подільська', center: [48.684, 26.585], zoom: 13 },
];

export const GEOMETRY_TYPES = {
  POINT: 'Point',
  LINE: 'LineString',
  POLYGON: 'Polygon',
};

export const DATASET_CLUSTERS = [
  {
    id: 'admin-boundaries',
    name: 'Адміністративні межі',
    nameEn: 'Administrative Boundaries',
    icon: 'boundaries',
    datasets: [
      { id: 'admin-borders', name: 'Адміністративні межі', nameEn: 'Administrative boundaries', geometry: GEOMETRY_TYPES.POLYGON, color: '#e74c3c' },
      { id: 'admin-units', name: 'Адміністративні одиниці', nameEn: 'Administrative units', geometry: GEOMETRY_TYPES.POLYGON, color: '#c0392b' },
    ],
  },
  {
    id: 'environment',
    name: 'Довкілля',
    nameEn: 'Environment',
    icon: 'environment',
    datasets: [
      { id: 'env-hazard', name: 'Зони екологічної небезпеки', nameEn: 'Environmental hazard areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#e67e22' },
      { id: 'env-impact', name: 'Зони впливу на довкілля', nameEn: 'Environmental impact areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#d35400' },
      { id: 'env-pollution', name: 'Зони забруднення', nameEn: 'Environmental pollution areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#a04000' },
      { id: 'green-areas', name: 'Зелені зони', nameEn: 'Green areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#27ae60' },
      { id: 'nature-reserve', name: 'Об\'єкти природно-заповідного фонду', nameEn: 'Nature reserve objects', geometry: GEOMETRY_TYPES.POINT, color: '#2ecc71' },
    ],
  },
  {
    id: 'economic',
    name: 'Економічна діяльність',
    nameEn: 'Economic Activity',
    icon: 'economic',
    datasets: [
      { id: 'industrial', name: 'Промислові об\'єкти', nameEn: 'Industrial facilities', geometry: GEOMETRY_TYPES.POINT, color: '#8e44ad' },
      { id: 'roadside-service', name: 'Об\'єкти придорожнього сервісу', nameEn: 'Roadside service facilities', geometry: GEOMETRY_TYPES.POINT, color: '#9b59b6' },
    ],
  },
  {
    id: 'social-infra',
    name: 'Громадська та соціальна інфраструктура',
    nameEn: 'Public & Social Infrastructure',
    icon: 'social',
    datasets: [
      { id: 'admin-institutions', name: 'Адміністративні установи', nameEn: 'Administrative institutions', geometry: GEOMETRY_TYPES.POINT, color: '#2c3e50' },
      { id: 'cultural-leisure', name: 'Заклади культури та дозвілля', nameEn: 'Cultural/leisure facilities', geometry: GEOMETRY_TYPES.POINT, color: '#e91e63' },
      { id: 'sports', name: 'Спортивні об\'єкти', nameEn: 'Sports facilities', geometry: GEOMETRY_TYPES.POINT, color: '#00bcd4' },
    ],
  },
  {
    id: 'basic-services',
    name: 'Базові послуги',
    nameEn: 'Basic Services',
    icon: 'services',
    datasets: [
      { id: 'water-supply', name: 'Об\'єкти водопостачання', nameEn: 'Water supply infrastructure', geometry: GEOMETRY_TYPES.POINT, color: '#3498db' },
      { id: 'sewerage', name: 'Об\'єкти каналізації', nameEn: 'Sewerage infrastructure', geometry: GEOMETRY_TYPES.POINT, color: '#1abc9c' },
      { id: 'gas-supply', name: 'Газопостачання', nameEn: 'Gas supply infrastructure', geometry: GEOMETRY_TYPES.POINT, color: '#f1c40f' },
      { id: 'electric-power', name: 'Електропостачання', nameEn: 'Electric power infrastructure', geometry: GEOMETRY_TYPES.POINT, color: '#e67e22' },
      { id: 'heating', name: 'Теплопостачання', nameEn: 'Heating infrastructure', geometry: GEOMETRY_TYPES.POINT, color: '#e74c3c' },
      { id: 'waste-mgmt', name: 'Об\'єкти поводження з відходами', nameEn: 'Waste management facilities', geometry: GEOMETRY_TYPES.POINT, color: '#795548' },
    ],
  },
  {
    id: 'transport',
    name: 'Транспортна мобільність та інфраструктура',
    nameEn: 'Transport Mobility & Infrastructure',
    icon: 'transport',
    datasets: [
      { id: 'road-network', name: 'Мережа доріг', nameEn: 'Road networks', geometry: GEOMETRY_TYPES.LINE, color: '#7f8c8d' },
      { id: 'street-segments', name: 'Вуличні сегменти', nameEn: 'Street and road segments', geometry: GEOMETRY_TYPES.LINE, color: '#95a5a6' },
      { id: 'transport-stops', name: 'Зупинки транспорту', nameEn: 'Transport stops', geometry: GEOMETRY_TYPES.POINT, color: '#2980b9' },
      { id: 'public-transport', name: 'Лінії громадського транспорту', nameEn: 'Public transport lines', geometry: GEOMETRY_TYPES.LINE, color: '#3498db' },
      { id: 'road-nodes', name: 'Вузли доріг', nameEn: 'Road nodes', geometry: GEOMETRY_TYPES.POINT, color: '#34495e' },
      { id: 'railway', name: 'Об\'єкти залізничної мережі', nameEn: 'Railway network facilities', geometry: GEOMETRY_TYPES.POINT, color: '#2c3e50' },
    ],
  },
  {
    id: 'civil-protection',
    name: 'Цивільний захист',
    nameEn: 'Civil Protection',
    icon: 'protection',
    datasets: [
      { id: 'warning-sirens', name: 'Сирени оповіщення', nameEn: 'Warning sirens', geometry: GEOMETRY_TYPES.POINT, color: '#e74c3c' },
      { id: 'civil-protection', name: 'Об\'єкти цивільного захисту', nameEn: 'Civil protection facilities', geometry: GEOMETRY_TYPES.POINT, color: '#c0392b' },
      { id: 'emergency-response', name: 'Аварійно-рятувальні об\'єкти', nameEn: 'Emergency response facilities', geometry: GEOMETRY_TYPES.POINT, color: '#e74c3c' },
      { id: 'invincibility-points', name: 'Пункти незламності', nameEn: 'Points of Invincibility', geometry: GEOMETRY_TYPES.POINT, color: '#f39c12' },
      { id: 'anthropogenic-threat', name: 'Зони техногенної загрози', nameEn: 'Anthropogenic threat areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#e74c3c' },
    ],
  },
  {
    id: 'education',
    name: 'Освіта',
    nameEn: 'Education',
    icon: 'education',
    datasets: [
      { id: 'education-institutions', name: 'Заклади освіти', nameEn: 'Education institutions', geometry: GEOMETRY_TYPES.POINT, color: '#3f51b5' },
      { id: 'education-routes', name: 'Маршрути до закладів освіти', nameEn: 'Education routes', geometry: GEOMETRY_TYPES.LINE, color: '#5c6bc0' },
    ],
  },
  {
    id: 'healthcare',
    name: 'Охорона здоров\'я',
    nameEn: 'Healthcare',
    icon: 'healthcare',
    datasets: [
      { id: 'health-facilities', name: 'Заклади охорони здоров\'я', nameEn: 'Health facilities', geometry: GEOMETRY_TYPES.POINT, color: '#f44336' },
    ],
  },
  {
    id: 'heritage',
    name: 'Спадщина',
    nameEn: 'Heritage',
    icon: 'heritage',
    datasets: [
      { id: 'heritage-facilities', name: 'Об\'єкти спадщини', nameEn: 'Heritage facilities', geometry: GEOMETRY_TYPES.POINT, color: '#ff9800' },
    ],
  },
  {
    id: 'housing',
    name: 'Житло',
    nameEn: 'Housing',
    icon: 'housing',
    datasets: [
      { id: 'housing-stats', name: 'Статистика житла', nameEn: 'Housing statistics', geometry: GEOMETRY_TYPES.POLYGON, color: '#607d8b' },
      { id: 'built-up', name: 'Забудовані території', nameEn: 'Built-up areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#9e9e9e' },
    ],
  },
  {
    id: 'open-spaces',
    name: 'Відкриті простори та культура',
    nameEn: 'Open Spaces & Culture',
    icon: 'open-spaces',
    datasets: [
      { id: 'landuse', name: 'Землекористування', nameEn: 'Landuse areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#8bc34a' },
      { id: 'landcover', name: 'Покриття землі', nameEn: 'Landcover areas', geometry: GEOMETRY_TYPES.POLYGON, color: '#4caf50' },
      { id: 'grounds', name: 'Майданчики', nameEn: 'Grounds', geometry: GEOMETRY_TYPES.POLYGON, color: '#cddc39' },
    ],
  },
  {
    id: 'damage',
    name: 'Оцінка пошкоджень',
    nameEn: 'Damage Assessment',
    icon: 'damage',
    datasets: [
      { id: 'idp-sites', name: 'Місця ВПО', nameEn: 'IDP Sites', geometry: GEOMETRY_TYPES.POINT, color: '#ff5722' },
    ],
  },
  {
    id: 'population',
    name: 'Населення та демографія',
    nameEn: 'Population & Demographics',
    icon: 'population',
    datasets: [
      { id: 'pop-stats-point', name: 'Статистика населення (точки)', nameEn: 'Population statistics (point)', geometry: GEOMETRY_TYPES.POINT, color: '#673ab7' },
      { id: 'pop-stats-polygon', name: 'Статистика населення (полігони)', nameEn: 'Population statistics (polygon)', geometry: GEOMETRY_TYPES.POLYGON, color: '#9c27b0' },
    ],
  },
  {
    id: 'projects',
    name: 'Реалізація проектів',
    nameEn: 'Project Implementation',
    icon: 'projects',
    datasets: [
      { id: 'implementation-projects', name: 'Проекти впровадження', nameEn: 'Implementation projects', geometry: GEOMETRY_TYPES.POINT, color: '#009688' },
    ],
  },
];

export const V2_CLUSTERS = [
  { id: 'spatial-planning', name: 'Просторове планування організації території', nameEn: 'Spatial planning organization' },
  { id: 'traditional-env', name: 'Відродження традиційного середовища', nameEn: 'Revival of traditional environment' },
  { id: 'land-use-structure', name: 'Структура землекористування', nameEn: 'Land use structure' },
  { id: 'landscape-planning', name: 'Ландшафтне планування', nameEn: 'Landscape planning' },
  { id: 'land-restrictions', name: 'Обмеження землекористування', nameEn: 'Land use restrictions' },
  { id: 'functional-zoning', name: 'Функціональне зонування території', nameEn: 'Functional zoning' },
  { id: 'buildings-engineering', name: 'Будівлі та інженерні споруди', nameEn: 'Buildings and engineering' },
  { id: 'engineering-protection', name: 'Інженерна підготовка та захист території', nameEn: 'Engineering protection' },
  { id: 'landscaping', name: 'Благоустрій', nameEn: 'Landscaping structures' },
  { id: 'special-buildings', name: 'Спеціальні будівлі та споруди', nameEn: 'Special buildings' },
  { id: 'functional-areas', name: 'Функціональні зони', nameEn: 'Functional areas' },
  { id: 'other-buildings', name: 'Інші будівлі та споруди', nameEn: 'Other buildings' },
];

export const DATASET_SCHEMAS = {
  'education-institutions': {
    fields: [
      { name: 'name', label: 'Назва', labelEn: 'Name', type: 'string', required: true },
      { name: 'owner', label: 'Власник', labelEn: 'Owner', type: 'string' },
      { name: 'capacity', label: 'Місткість', labelEn: 'Capacity', type: 'integer' },
      { name: 'longitude', label: 'Довгота', labelEn: 'Longitude', type: 'decimal', precision: '8,6' },
      { name: 'latitude', label: 'Широта', labelEn: 'Latitude', type: 'decimal', precision: '8,6' },
      { name: 'year', label: 'Рік', labelEn: 'Year', type: 'integer' },
      { name: 'level', label: 'Рівень', labelEn: 'Level', type: 'string' },
      { name: 'type', label: 'Тип', labelEn: 'Type', type: 'dropdown', options: ['Загальноосвітня', 'Дошкільна', 'Позашкільна', 'Професійна', 'Вища'] },
      { name: 'shelter', label: 'Укриття', labelEn: 'Shelter', type: 'dropdown', options: ['Є', 'Немає', 'Частково'] },
      { name: 'damage', label: 'Пошкодження', labelEn: 'Damage', type: 'dropdown', options: ['Немає', 'Незначні', 'Середні', 'Значні', 'Зруйновано'] },
      { name: 'damageLevel', label: 'Рівень пошкоджень', labelEn: 'Damage Level', type: 'integer' },
    ],
  },
  'health-facilities': {
    fields: [
      { name: 'name', label: 'Назва', labelEn: 'Name', type: 'string', required: true },
      { name: 'owner', label: 'Власник', labelEn: 'Owner', type: 'string' },
      { name: 'beds', label: 'Ліжко-місця', labelEn: 'Beds', type: 'integer' },
      { name: 'longitude', label: 'Довгота', labelEn: 'Longitude', type: 'decimal', precision: '8,6' },
      { name: 'latitude', label: 'Широта', labelEn: 'Latitude', type: 'decimal', precision: '8,6' },
      { name: 'type', label: 'Тип', labelEn: 'Type', type: 'dropdown', options: ['Лікарня', 'Поліклініка', 'Амбулаторія', 'ФАП', 'Стоматологія'] },
      { name: 'shelter', label: 'Укриття', labelEn: 'Shelter', type: 'dropdown', options: ['Є', 'Немає', 'Частково'] },
      { name: 'damage', label: 'Пошкодження', labelEn: 'Damage', type: 'dropdown', options: ['Немає', 'Незначні', 'Середні', 'Значні', 'Зруйновано'] },
    ],
  },
  _default: {
    fields: [
      { name: 'name', label: 'Назва', labelEn: 'Name', type: 'string', required: true },
      { name: 'description', label: 'Опис', labelEn: 'Description', type: 'string' },
      { name: 'longitude', label: 'Довгота', labelEn: 'Longitude', type: 'decimal', precision: '8,6' },
      { name: 'latitude', label: 'Широта', labelEn: 'Latitude', type: 'decimal', precision: '8,6' },
      { name: 'status', label: 'Статус', labelEn: 'Status', type: 'string' },
      { name: 'damage', label: 'Пошкодження', labelEn: 'Damage', type: 'dropdown', options: ['Немає', 'Незначні', 'Середні', 'Значні', 'Зруйновано'] },
    ],
  },
};

export function getSchemaForDataset(datasetId) {
  return DATASET_SCHEMAS[datasetId] || DATASET_SCHEMAS._default;
}

export const FEEDBACK_CATEGORIES = [
  { id: 'green-space', name: 'Зелені зони', nameEn: 'Green Space', color: '#27ae60' },
  { id: 'transport', name: 'Транспорт', nameEn: 'Transport', color: '#3498db' },
  { id: 'damage', name: 'Пошкодження', nameEn: 'Damage', color: '#e74c3c' },
  { id: 'safety', name: 'Безпека', nameEn: 'Safety', color: '#e67e22' },
  { id: 'infrastructure', name: 'Інфраструктура', nameEn: 'Infrastructure', color: '#9b59b6' },
  { id: 'housing', name: 'Житло', nameEn: 'Housing', color: '#607d8b' },
  { id: 'education', name: 'Освіта', nameEn: 'Education', color: '#3f51b5' },
  { id: 'healthcare', name: 'Медицина', nameEn: 'Healthcare', color: '#f44336' },
  { id: 'culture', name: 'Культура', nameEn: 'Culture', color: '#ff9800' },
  { id: 'other', name: 'Інше', nameEn: 'Other', color: '#95a5a6' },
];

export const OCCUPATION_TYPES = [
  { id: 'resident', name: 'Мешканець громади', nameEn: 'Community resident' },
  { id: 'business', name: 'Підприємець', nameEn: 'Business owner' },
  { id: 'leader', name: 'Лідер громади', nameEn: 'Community leader' },
  { id: 'ngo', name: 'Представник НУО', nameEn: 'NGO representative' },
  { id: 'government', name: 'Державний службовець', nameEn: 'Government official' },
  { id: 'other', name: 'Інше', nameEn: 'Other' },
];

export const AGE_GROUPS = [
  { id: '18-24', name: '18-24' },
  { id: '25-34', name: '25-34' },
  { id: '35-44', name: '35-44' },
  { id: '45-54', name: '45-54' },
  { id: '55-64', name: '55-64' },
  { id: '65+', name: '65+' },
];

export const RECOVERY_STATUSES = [
  'Не застосовується',
  'Не розпочато',
  'В процесі ремонту',
  'Частково відремонтовано',
  'Відремонтовано',
  'Відбудовано',
];
