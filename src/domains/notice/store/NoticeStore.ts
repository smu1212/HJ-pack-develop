import { create } from 'zustand';

interface Notice {
  id: number;
  title: string;
  createdAt: string;
}

interface Image {
  id: number;
  url: string;
  createdAt: string;
}

interface RelatedNotice {
  id: number;
  title: string;
}

interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  prevNotice: RelatedNotice | null;
  nextNotice: RelatedNotice | null;
}

interface NoticeState {
  activeTab: 'notice' | 'report';
  searchType: 'title' | 'content' | 'author';
  searchQuery: string;
  currentPage: number;
  notices: Notice[];
  total: number;
  loading: boolean;
  error: string | null;
  
  detail: NoticeDetail | null;
  detailLoading: boolean;
  detailError: string | null;
  isEditing: boolean;
  editTitle: string;
  editContent: string;
  
  writeTitle: string;
  writeContent: string;
  writeLoading: boolean;
  writeError: string | null;
  
  password: string;
  passwordLoading: boolean;
  passwordError: string | null;
  showPassword: boolean;
  
  setActiveTab: (tab: 'notice' | 'report') => void;
  setSearchType: (type: 'title' | 'content' | 'author') => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setNotices: (notices: Notice[]) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchNotices: (page?: number) => Promise<void>;
  handleSearch: () => void;
  
  setDetail: (detail: NoticeDetail | null) => void;
  setDetailLoading: (loading: boolean) => void;
  setDetailError: (error: string | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditTitle: (title: string) => void;
  setEditContent: (content: string) => void;
  fetchNoticeDetail: (id: number) => Promise<void>;
  updateNotice: (id: number, accessToken: string) => Promise<boolean>;
  deleteNotice: (id: number, accessToken: string) => Promise<boolean>;
  
  setWriteTitle: (title: string) => void;
  setWriteContent: (content: string) => void;
  setWriteLoading: (loading: boolean) => void;
  setWriteError: (error: string | null) => void;
  createNotice: (accessToken: string) => Promise<boolean>;
  clearWriteForm: () => void;
  
  setPassword: (password: string) => void;
  setPasswordLoading: (loading: boolean) => void;
  setPasswordError: (error: string | null) => void;
  setShowPassword: (show: boolean) => void;
  submitPassword: (setToken: (token: string) => void) => Promise<boolean>;
  clearPasswordForm: () => void;
  
  reset: () => void;
  resetDetail: () => void;
}

const initialState = {
  activeTab: 'notice' as const,
  searchType: 'title' as const,
  searchQuery: '',
  currentPage: 1,
  notices: [],
  total: 0,
  loading: false,
  error: null,
  detail: null,
  detailLoading: false,
  detailError: null,
  isEditing: false,
  editTitle: '',
  editContent: '',
  writeTitle: '',
  writeContent: '',
  writeLoading: false,
  writeError: null,
  password: '',
  passwordLoading: false,
  passwordError: null,
  showPassword: false,
};

export const useNoticeStore = create<NoticeState>((set, get) => ({
  ...initialState,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchType: (type) => set({ searchType: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setNotices: (notices) => set({ notices }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchNotices: async (page = 1) => {
    const { searchQuery, searchType } = get();
    
    set({ loading: true, error: null });
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        take: '10',
        sort: 'latest',
      });

      if (searchQuery) {
        if (searchType === 'title') {
          params.append('title', searchQuery);
        } else if (searchType === 'content') {
          params.append('content', searchQuery);
        } else if (searchType === 'author') {
          params.append('author', searchQuery);
        }
      }

      const response = await fetch(
        `https://api.dev.hj-pack.eoe.sh/notice?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('공지사항을 불러오지 못했습니다.');
      }

      const data = await response.json();
      set({
        notices: data.list,
        total: data.total,
        currentPage: page,
        loading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : '오류가 발생했습니다.',
        loading: false,
      });
    }
  },

  handleSearch: () => {
    const { fetchNotices } = get();
    set({ currentPage: 1 });
    fetchNotices(1);
  },

  setDetail: (detail) => set({ detail }),
  setDetailLoading: (loading) => set({ detailLoading: loading }),
  setDetailError: (error) => set({ detailError: error }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setEditTitle: (title) => set({ editTitle: title }),
  setEditContent: (content) => set({ editContent: content }),

  fetchNoticeDetail: async (id: number) => {
    set({ detailLoading: true, detailError: null });
    
    try {
      const response = await fetch(
        `https://api.dev.hj-pack.eoe.sh/notice/${id}`
      );

      if (!response.ok) {
        throw new Error('공지사항을 불러오지 못했습니다.');
      }

      const data: NoticeDetail = await response.json();
      set({
        detail: data,
        editTitle: data.title,
        editContent: data.content,
        detailLoading: false,
      });
    } catch (err) {
      set({
        detailError: err instanceof Error ? err.message : '오류가 발생했습니다.',
        detailLoading: false,
      });
    }
  },

  updateNotice: async (id: number, accessToken: string) => {
    const { editTitle, editContent } = get();
    
    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('content', editContent);
    formData.append('removeImage', 'true');

    try {
      const response = await fetch(`https://api.dev.hj-pack.eoe.sh/notice/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('공지사항 수정에 실패했습니다.');
      }

      await get().fetchNoticeDetail(id);
      set({ isEditing: false });
      return true;
    } catch (err) {
      alert(err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.');
      return false;
    }
  },

  deleteNotice: async (id: number, accessToken: string) => {
    try {
      const response = await fetch(`https://api.dev.hj-pack.eoe.sh/notice/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('공지사항 삭제에 실패했습니다.');
      }

      return true;
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
      return false;
    }
  },

  setWriteTitle: (title) => set({ writeTitle: title }),
  setWriteContent: (content) => set({ writeContent: content }),
  setWriteLoading: (loading) => set({ writeLoading: loading }),
  setWriteError: (error) => set({ writeError: error }),

  createNotice: async (accessToken: string) => {
    const { writeTitle, writeContent } = get();

    if (!writeTitle.trim() || !writeContent.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return false;
    }

    set({ writeLoading: true, writeError: null });

    try {
      const formData = new FormData();
      formData.append('title', writeTitle);
      formData.append('content', writeContent);

      const response = await fetch('https://api.dev.hj-pack.eoe.sh/notice', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || '공지사항 생성에 실패했습니다.');
      }

      get().clearWriteForm();
      set({ writeLoading: false });
      return true;
    } catch (err) {
      set({
        writeError: err instanceof Error ? err.message : '오류가 발생했습니다.',
        writeLoading: false,
      });
      return false;
    }
  },

  clearWriteForm: () => set({
    writeTitle: '',
    writeContent: '',
    writeError: null,
  }),

  setPassword: (password) => set({ password }),
  setPasswordLoading: (loading) => set({ passwordLoading: loading }),
  setPasswordError: (error) => set({ passwordError: error }),
  setShowPassword: (show) => set({ showPassword: show }),

  submitPassword: async (setToken: (token: string) => void) => {
    const { password } = get();

    if (!password.trim()) {
      set({ passwordError: '비밀번호를 입력해주세요.' });
      return false;
    }

    set({ passwordLoading: true, passwordError: null });

    try {
      // SHA256 해싱 (브라우저 환경)
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashed = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const response = await fetch('https://api.dev.hj-pack.eoe.sh/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: hashed }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || '로그인에 실패하였습니다.');
      }

      const data = await response.json();
      setToken(data.accessToken);
      get().clearPasswordForm();
      set({ passwordLoading: false });
      return true;
    } catch (err) {
      set({
        passwordError: err instanceof Error ? err.message : '오류가 발생했습니다.',
        passwordLoading: false,
      });
      return false;
    }
  },

  clearPasswordForm: () => set({
    password: '',
    passwordError: null,
    showPassword: false,
  }),

  reset: () => set(initialState),
  resetDetail: () => set({
    detail: null,
    detailLoading: false,
    detailError: null,
    isEditing: false,
    editTitle: '',
    editContent: '',
  }),
}));