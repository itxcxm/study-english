'use client';

/**
 * 🇻🇳 Hook quản lý toast notifications
 * 🇻🇳 Lấy cảm hứng từ thư viện react-hot-toast
 */
import * as React from 'react';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

// 🇻🇳 Giới hạn số lượng toast hiển thị cùng lúc
const TOAST_LIMIT = 1;
// 🇻🇳 Thời gian delay trước khi tự động xóa toast (milliseconds)
const TOAST_REMOVE_DELAY = 1000000;

// 🇻🇳 Kiểu dữ liệu cho toast notification
type ToasterToast = ToastProps & {
  id: string; // 🇻🇳 ID duy nhất của toast
  title?: React.ReactNode; // 🇻🇳 Tiêu đề của toast
  description?: React.ReactNode; // 🇻🇳 Mô tả chi tiết của toast
  action?: ToastActionElement; // 🇻🇳 Hành động tùy chọn (nút bấm, v.v.)
};

// 🇻🇳 Các loại hành động có thể thực hiện với toast
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST', // 🇻🇳 Thêm toast mới
  UPDATE_TOAST: 'UPDATE_TOAST', // 🇻🇳 Cập nhật toast hiện có
  DISMISS_TOAST: 'DISMISS_TOAST', // 🇻🇳 Đóng toast
  REMOVE_TOAST: 'REMOVE_TOAST', // 🇻🇳 Xóa toast khỏi danh sách
} as const;

// 🇻🇳 Bộ đếm để tạo ID duy nhất cho mỗi toast
let count = 0;

/**
 * 🇻🇳 Tạo ID duy nhất cho toast
 * @returns Chuỗi ID duy nhất
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// 🇻🇳 Kiểu dữ liệu cho các loại hành động
type ActionType = typeof actionTypes;

// 🇻🇳 Union type cho tất cả các hành động có thể thực hiện
type Action =
  | {
      type: ActionType['ADD_TOAST']; // 🇻🇳 Thêm toast mới
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST']; // 🇻🇳 Cập nhật toast
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST']; // 🇻🇳 Đóng toast
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST']; // 🇻🇳 Xóa toast
      toastId?: ToasterToast['id'];
    };

// 🇻🇳 State của toast system - danh sách các toast hiện tại
interface State {
  toasts: ToasterToast[];
}

// 🇻🇳 Map lưu trữ các timeout để tự động xóa toast sau một khoảng thời gian
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * 🇻🇳 Thêm toast vào hàng đợi để tự động xóa sau một khoảng thời gian
 * @param toastId - ID của toast cần xóa
 */
const addToRemoveQueue = (toastId: string) => {
  // 🇻🇳 Nếu đã có timeout cho toast này, không tạo mới
  if (toastTimeouts.has(toastId)) {
    return;
  }

  // 🇻🇳 Tạo timeout để tự động xóa toast sau TOAST_REMOVE_DELAY milliseconds
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * 🇻🇳 Reducer để quản lý state của toast system
 * 🇻🇳 Xử lý các hành động: thêm, cập nhật, đóng, xóa toast
 * @param state - State hiện tại của toast system
 * @param action - Hành động cần thực hiện
 * @returns State mới sau khi xử lý hành động
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // 🇻🇳 Thêm toast mới vào đầu danh sách, giới hạn số lượng theo TOAST_LIMIT
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    // 🇻🇳 Cập nhật thông tin của toast hiện có
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    // 🇻🇳 Đóng toast (có thể đóng một toast cụ thể hoặc tất cả)
    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // 🇻🇳 Side effect: Thêm toast vào hàng đợi để tự động xóa sau một khoảng thời gian
      // 🇻🇳 Có thể tách ra thành hàm riêng, nhưng giữ ở đây để đơn giản hóa
      if (toastId) {
        // 🇻🇳 Đóng một toast cụ thể
        addToRemoveQueue(toastId);
      } else {
        // 🇻🇳 Đóng tất cả các toast
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // 🇻🇳 Đánh dấu toast là đã đóng
              }
            : t
        ),
      };
    }
    // 🇻🇳 Xóa toast khỏi danh sách (có thể xóa một toast cụ thể hoặc tất cả)
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        // 🇻🇳 Xóa tất cả toast
        return {
          ...state,
          toasts: [],
        };
      }
      // 🇻🇳 Xóa một toast cụ thể
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// 🇻🇳 Danh sách các listener để thông báo khi state thay đổi
const listeners: Array<(state: State) => void> = [];

// 🇻🇳 State được lưu trong memory (không phụ thuộc vào React component)
let memoryState: State = { toasts: [] };

/**
 * 🇻🇳 Dispatch một hành động để cập nhật state và thông báo cho tất cả listeners
 * @param action - Hành động cần thực hiện
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  // 🇻🇳 Thông báo cho tất cả listeners về state mới
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// 🇻🇳 Kiểu dữ liệu cho toast (không bao gồm id vì sẽ được tạo tự động)
type Toast = Omit<ToasterToast, 'id'>;

/**
 * 🇻🇳 Hàm tạo và hiển thị toast mới
 * @param props - Thuộc tính của toast (title, description, action, v.v.)
 * @returns Object chứa id, dismiss và update functions
 */
function toast({ ...props }: Toast) {
  const id = genId();

  // 🇻🇳 Hàm để cập nhật toast này
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  
  // 🇻🇳 Hàm để đóng toast này
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  // 🇻🇳 Thêm toast mới vào state
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true, // 🇻🇳 Mặc định toast được mở
      onOpenChange: (open) => {
        // 🇻🇳 Tự động đóng khi người dùng click đóng
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss, // 🇻🇳 Hàm để đóng toast
    update, // 🇻🇳 Hàm để cập nhật toast
  };
}

/**
 * 🇻🇳 Hook để sử dụng toast notifications trong React components
 * @returns Object chứa state, toast function, và dismiss function
 */
function useToast() {
  // 🇻🇳 State local trong component, được đồng bộ với memoryState
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    // 🇻🇳 Đăng ký listener để nhận cập nhật khi state thay đổi
    listeners.push(setState);
    return () => {
      // 🇻🇳 Hủy đăng ký listener khi component unmount
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state, // 🇻🇳 State hiện tại (toasts array)
    toast, // 🇻🇳 Function để tạo toast mới
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }), // 🇻🇳 Function để đóng toast
  };
}

export { useToast, toast };
