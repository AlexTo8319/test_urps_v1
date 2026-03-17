import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { HROMADAS, DATASET_CLUSTERS } from '../data/catalog';
import { generateSampleData, DREAM_PROJECTS } from '../data/sampleData';

const useStore = create((set, get) => ({
  // Hromada
  currentHromada: HROMADAS[1], // Default to Irpin
  setCurrentHromada: (hromada) => set({ currentHromada: hromada }),

  // Language
  language: 'uk',
  setLanguage: (lang) => set({ language: lang }),

  // Map state
  mapCenter: HROMADAS[1].center,
  mapZoom: HROMADAS[1].zoom,
  mapStyle: 'street', // 'street' | 'satellite'
  setMapCenter: (center) => set({ mapCenter: center }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  setMapStyle: (style) => set({ mapStyle: style }),

  // Sidebar
  sidebarOpen: true,
  sidebarSection: 'datasets', // 'datasets' | 'participation' | 'upload' | 'dashboard' | 'settings' | 'modeling' | 'accessibility'
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarSection: (section) => set({ sidebarSection: section }),

  // Right panel
  rightPanelOpen: true,
  rightPanelTab: 'legend', // 'legend' | 'layers'
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),

  // Active layers
  activeLayers: {},
  layerOpacity: {},
  toggleLayer: (layerId) => set((s) => ({
    activeLayers: { ...s.activeLayers, [layerId]: !s.activeLayers[layerId] },
  })),
  setLayerOpacity: (layerId, opacity) => set((s) => ({
    layerOpacity: { ...s.layerOpacity, [layerId]: opacity },
  })),

  // Dataset data
  datasetData: generateSampleData(),
  setDatasetData: (datasetId, data) => set((s) => ({
    datasetData: { ...s.datasetData, [datasetId]: data },
  })),
  addDataEntry: (datasetId, entry) => set((s) => ({
    datasetData: {
      ...s.datasetData,
      [datasetId]: [...(s.datasetData[datasetId] || []), { ...entry, id: entry.id || uuidv4() }],
    },
  })),
  updateDataEntry: (datasetId, entryId, updates) => set((s) => ({
    datasetData: {
      ...s.datasetData,
      [datasetId]: (s.datasetData[datasetId] || []).map((e) =>
        e.id === entryId ? { ...e, ...updates } : e
      ),
    },
  })),
  removeDataEntry: (datasetId, entryId) => set((s) => ({
    datasetData: {
      ...s.datasetData,
      [datasetId]: (s.datasetData[datasetId] || []).filter((e) => e.id !== entryId),
    },
  })),

  // Modals
  activeModal: null,
  modalData: null,
  openModal: (modalType, data = null) => set({ activeModal: modalType, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // Table view
  tableViewDataset: null,
  setTableViewDataset: (datasetId) => set({ tableViewDataset: datasetId }),

  // Chart view
  chartViewDataset: null,
  setChartViewDataset: (datasetId) => set({ chartViewDataset: datasetId }),

  // Selected feature
  selectedFeature: null,
  selectedDatasetId: null,
  setSelectedFeature: (feature, datasetId) => set({ selectedFeature: feature, selectedDatasetId: datasetId }),
  clearSelectedFeature: () => set({ selectedFeature: null, selectedDatasetId: null }),

  // Drawing mode
  drawingMode: null, // null | 'point' | 'line' | 'polygon'
  drawingDataset: null,
  setDrawingMode: (mode, datasetId = null) => set({ drawingMode: mode, drawingDataset: datasetId }),

  // Surveys (participation module)
  surveys: [],
  addSurvey: (survey) => set((s) => ({
    surveys: [...s.surveys, { ...survey, id: survey.id || uuidv4(), createdAt: new Date().toISOString(), responses: [], feedbacks: [] }],
  })),
  updateSurvey: (surveyId, updates) => set((s) => ({
    surveys: s.surveys.map((sv) => sv.id === surveyId ? { ...sv, ...updates } : sv),
  })),
  deleteSurvey: (surveyId) => set((s) => ({
    surveys: s.surveys.filter((sv) => sv.id !== surveyId),
  })),
  addSurveyResponse: (surveyId, response) => set((s) => ({
    surveys: s.surveys.map((sv) =>
      sv.id === surveyId
        ? { ...sv, responses: [...(sv.responses || []), { ...response, id: uuidv4(), submittedAt: new Date().toISOString() }] }
        : sv
    ),
  })),
  addSurveyFeedback: (surveyId, feedback) => set((s) => ({
    surveys: s.surveys.map((sv) =>
      sv.id === surveyId
        ? { ...sv, feedbacks: [...(sv.feedbacks || []), { ...feedback, id: uuidv4(), submittedAt: new Date().toISOString() }] }
        : sv
    ),
  })),

  // DREAM data
  dreamProjects: DREAM_PROJECTS,
  dreamLayerActive: false,
  dreamLastSync: null,
  toggleDreamLayer: () => set((s) => ({ dreamLayerActive: !s.dreamLayerActive })),
  syncDreamData: () => {
    // Simulates an API sync
    set({ dreamLastSync: new Date().toISOString() });
    return { success: true, count: DREAM_PROJECTS.length };
  },

  // Notifications
  notifications: [],
  addNotification: (notification) => set((s) => ({
    notifications: [...s.notifications, { ...notification, id: uuidv4(), timestamp: new Date().toISOString() }],
  })),
  removeNotification: (id) => set((s) => ({
    notifications: s.notifications.filter((n) => n.id !== id),
  })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Filters
  activeFilters: {},
  setFilter: (key, value) => set((s) => ({
    activeFilters: { ...s.activeFilters, [key]: value },
  })),
  clearFilters: () => set({ activeFilters: {} }),
}));

export default useStore;
