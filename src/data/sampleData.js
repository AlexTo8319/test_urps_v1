import { v4 as uuidv4 } from 'uuid';

// Sample data for Irpin hromada area
export function generateSampleData() {
  const data = {};

  // Education institutions
  data['education-institutions'] = [
    { id: uuidv4(), name: 'Ірпінська гімназія №1', owner: 'Ірпінська міська рада', capacity: 850, latitude: 50.5218, longitude: 30.2510, year: 2005, level: 'Середня', type: 'Загальноосвітня', shelter: 'Є', damage: 'Середні', damageLevel: 3 },
    { id: uuidv4(), name: 'Ліцей №3 ім. Шевченка', owner: 'Ірпінська міська рада', capacity: 620, latitude: 50.5190, longitude: 30.2380, year: 1998, level: 'Середня', type: 'Загальноосвітня', shelter: 'Є', damage: 'Незначні', damageLevel: 1 },
    { id: uuidv4(), name: 'ДНЗ "Сонечко"', owner: 'Ірпінська міська рада', capacity: 200, latitude: 50.5245, longitude: 30.2450, year: 2010, level: 'Дошкільна', type: 'Дошкільна', shelter: 'Немає', damage: 'Значні', damageLevel: 4 },
    { id: uuidv4(), name: 'Школа мистецтв', owner: 'Ірпінська міська рада', capacity: 300, latitude: 50.5170, longitude: 30.2550, year: 2003, level: 'Позашкільна', type: 'Позашкільна', shelter: 'Частково', damage: 'Немає', damageLevel: 0 },
    { id: uuidv4(), name: 'КЗСО "Ірпінський НВК"', owner: 'Ірпінська міська рада', capacity: 1100, latitude: 50.5260, longitude: 30.2600, year: 2012, level: 'Середня', type: 'Загальноосвітня', shelter: 'Є', damage: 'Незначні', damageLevel: 1 },
  ];

  // Health facilities
  data['health-facilities'] = [
    { id: uuidv4(), name: 'Ірпінська центральна лікарня', owner: 'МОЗ', beds: 250, latitude: 50.5200, longitude: 30.2490, type: 'Лікарня', shelter: 'Є', damage: 'Середні' },
    { id: uuidv4(), name: 'Поліклініка №1', owner: 'Ірпінська міська рада', beds: 0, latitude: 50.5230, longitude: 30.2420, type: 'Поліклініка', shelter: 'Немає', damage: 'Значні' },
    { id: uuidv4(), name: 'Амбулаторія сімейної медицини', owner: 'Ірпінська міська рада', beds: 10, latitude: 50.5180, longitude: 30.2560, type: 'Амбулаторія', shelter: 'Частково', damage: 'Незначні' },
    { id: uuidv4(), name: 'Стоматологічна поліклініка', owner: 'Приватна', beds: 0, latitude: 50.5210, longitude: 30.2350, type: 'Стоматологія', shelter: 'Немає', damage: 'Немає' },
  ];

  // Transport stops
  data['transport-stops'] = [
    { id: uuidv4(), name: 'Центральна автостанція', latitude: 50.5215, longitude: 30.2500, status: 'Діє', damage: 'Незначні' },
    { id: uuidv4(), name: 'Залізнична станція Ірпінь', latitude: 50.5210, longitude: 30.2540, status: 'Діє', damage: 'Середні' },
    { id: uuidv4(), name: 'Зупинка "Ринок"', latitude: 50.5225, longitude: 30.2470, status: 'Діє', damage: 'Немає' },
    { id: uuidv4(), name: 'Зупинка "Лікарня"', latitude: 50.5202, longitude: 30.2485, status: 'Діє', damage: 'Незначні' },
    { id: uuidv4(), name: 'Зупинка "Школа"', latitude: 50.5220, longitude: 30.2520, status: 'Не діє', damage: 'Значні' },
  ];

  // Warning sirens
  data['warning-sirens'] = [
    { id: uuidv4(), name: 'Сирена центр', latitude: 50.5220, longitude: 30.2500, status: 'Працює', damage: 'Немає' },
    { id: uuidv4(), name: 'Сирена північ', latitude: 50.5280, longitude: 30.2480, status: 'Працює', damage: 'Немає' },
    { id: uuidv4(), name: 'Сирена захід', latitude: 50.5200, longitude: 30.2350, status: 'Не працює', damage: 'Значні' },
  ];

  // Invincibility points
  data['invincibility-points'] = [
    { id: uuidv4(), name: 'Пункт незламності #1 (Школа)', latitude: 50.5218, longitude: 30.2510, status: 'Діє', damage: 'Немає' },
    { id: uuidv4(), name: 'Пункт незламності #2 (Бібліотека)', latitude: 50.5240, longitude: 30.2430, status: 'Діє', damage: 'Немає' },
    { id: uuidv4(), name: 'Пункт незламності #3 (ДК)', latitude: 50.5195, longitude: 30.2570, status: 'Тимчасово зупинено', damage: 'Незначні' },
  ];

  // Heritage facilities
  data['heritage-facilities'] = [
    { id: uuidv4(), name: 'Садиба Шевченка', latitude: 50.5230, longitude: 30.2460, status: 'Потребує реставрації', damage: 'Середні' },
    { id: uuidv4(), name: 'Церква Св. Миколая', latitude: 50.5205, longitude: 30.2520, status: 'Діє', damage: 'Незначні' },
  ];

  // Water supply
  data['water-supply'] = [
    { id: uuidv4(), name: 'Водозабір "Ірпінь-1"', latitude: 50.5250, longitude: 30.2400, status: 'Працює', damage: 'Немає' },
    { id: uuidv4(), name: 'Насосна станція центральна', latitude: 50.5210, longitude: 30.2480, status: 'Працює частково', damage: 'Середні' },
  ];

  // Admin institutions
  data['admin-institutions'] = [
    { id: uuidv4(), name: 'Ірпінська міська рада', latitude: 50.5222, longitude: 30.2495, status: 'Діє', damage: 'Незначні' },
    { id: uuidv4(), name: 'ЦНАП', latitude: 50.5215, longitude: 30.2510, status: 'Діє', damage: 'Немає' },
  ];

  // Implementation projects
  data['implementation-projects'] = [
    { id: uuidv4(), name: 'Відбудова школи №2', description: 'Повна реконструкція зруйнованої школи', latitude: 50.5235, longitude: 30.2490, status: 'В процесі', estimatedBeneficiaries: 500 },
    { id: uuidv4(), name: 'Ремонт водопроводу', description: 'Заміна пошкодженої водопровідної мережі', latitude: 50.5210, longitude: 30.2460, status: 'Плановий', estimatedBeneficiaries: 3000 },
    { id: uuidv4(), name: 'Парк відновлення', description: 'Створення нового громадського парку', latitude: 50.5250, longitude: 30.2550, status: 'Плановий', estimatedBeneficiaries: 10000 },
  ];

  // Green areas (polygons)
  data['green-areas'] = [
    {
      id: uuidv4(), name: 'Центральний парк', description: 'Головний міський парк',
      geometry: { type: 'Polygon', coordinates: [[[30.244, 50.524], [30.248, 50.524], [30.248, 50.526], [30.244, 50.526], [30.244, 50.524]]] },
    },
    {
      id: uuidv4(), name: 'Сквер біля ринку', description: 'Зелена зона біля центрального ринку',
      geometry: { type: 'Polygon', coordinates: [[[30.246, 50.522], [30.248, 50.522], [30.248, 50.523], [30.246, 50.523], [30.246, 50.522]]] },
    },
  ];

  // Road network (lines)
  data['road-network'] = [
    {
      id: uuidv4(), name: 'вул. Центральна', description: 'Головна вулиця',
      geometry: { type: 'LineString', coordinates: [[30.240, 50.521], [30.245, 50.522], [30.250, 50.522], [30.255, 50.523]] },
    },
    {
      id: uuidv4(), name: 'вул. Шевченка', description: 'Вулиця Шевченка',
      geometry: { type: 'LineString', coordinates: [[30.245, 50.519], [30.246, 50.522], [30.247, 50.525]] },
    },
  ];

  // Admin boundaries (polygon)
  data['admin-borders'] = [
    {
      id: uuidv4(), name: 'Ірпінська міська громада',
      geometry: { type: 'Polygon', coordinates: [[[30.20, 50.50], [30.30, 50.50], [30.30, 50.55], [30.20, 50.55], [30.20, 50.50]]] },
    },
  ];

  return data;
}

// DREAM API mock data
export const DREAM_PROJECTS = [
  { id: 'DREAM-001', name: 'Відновлення школи №5', type: 'Освіта', status: 'В процесі', latitude: 50.5230, longitude: 30.2480, budget: 15000000, source: 'DREAM' },
  { id: 'DREAM-002', name: 'Ремонт дороги Ірпінь-Буча', type: 'Транспорт', status: 'Заплановано', latitude: 50.5190, longitude: 30.2550, budget: 8000000, source: 'DREAM' },
  { id: 'DREAM-003', name: 'Відновлення водопроводу', type: 'Інфраструктура', status: 'Завершено', latitude: 50.5245, longitude: 30.2410, budget: 5000000, source: 'DREAM' },
  { id: 'DREAM-004', name: 'Будівництво укриття', type: 'Цивільний захист', status: 'В процесі', latitude: 50.5210, longitude: 30.2530, budget: 3000000, source: 'DREAM' },
  { id: 'DREAM-005', name: 'Парк Перемоги', type: 'Зелені зони', status: 'Заплановано', latitude: 50.5260, longitude: 30.2470, budget: 12000000, source: 'DREAM' },
];
