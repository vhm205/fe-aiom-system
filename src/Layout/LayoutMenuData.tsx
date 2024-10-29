import {
  CalendarDays,
  MonitorDot,
  PictureInPicture2,
  RadioTower,
  ScrollText,
} from "lucide-react";

const menuData: any = [
  {
    label: "ADMIN, SUPERVISOR",
    isTitle: true,
  },
  {
    id: "auth-dashboard",
    label: "Quản lý người dùng",
    link: "/#",
    icon: <MonitorDot />,
    subItems: [
      {
        id: "user-auth-dashboard",
        label: "Người dùng",
        link: "/users",
        parentId: "auth-dashboard",
      },
      {
        id: "role-auth-dashboard",
        label: "Chức vụ",
        link: "/roles",
        parentId: "auth-dashboard",
      },
    ],
  },
  {
    label: "USER",
    isTitle: true,
  },
  {
    id: "goods-dashboard",
    label: "Quản lý hàng hóa",
    link: "/#",
    icon: <PictureInPicture2 />,
    subItems: [
      {
        id: "goods-page",
        label: "Hàng hóa",
        link: "/goods",
        parentId: "goods-dashboard",
      },
      {
        id: "inventory-page",
        label: "Kho, hàng tồn",
        link: "/inventory",
        parentId: "goods-dashboard",
      },
    ],
  },
  {
    id: "sales-dashboard",
    label: "Quản lý bán hàng",
    link: "/#",
    icon: <CalendarDays />,
    subItems: [
      {
        id: "sales-handbook-page",
        label: "Sổ tay bán hàng",
        link: "/sales-handbook",
        parentId: "sales-dashboard",
      },
      {
        id: "bill-page",
        label: "Hóa đơn",
        link: "/bill",
        parentId: "sales-dashboard",
      },
      {
        id: "sales-channel-page",
        label: "Kênh bán",
        link: "/sales-channel",
        parentId: "sales-dashboard",
      },
    ],
  },
  {
    id: "finance-dashboard",
    label: "Quản lý tài chính",
    icon: <RadioTower />,
    subItems: [
      {
        id: "revenue-page",
        label: "Doanh thu",
        link: "/revenue",
        parentId: "finance-dashboard",
      },
      {
        id: "report-page",
        label: "Báo cáo thu chi",
        link: "/report",
        parentId: "finance-dashboard",
      },
      {
        id: "analytics-page",
        label: "Phân tích bán hàng",
        link: "/analytics",
        parentId: "finance-dashboard",
      },
    ],
  },
  {
    id: "hr-dashboard",
    label: "Quản lý nhân sự",
    icon: <RadioTower />,
    subItems: [
      {
        id: "hr-page",
        label: "Nhân sự",
        link: "/hr",
        parentId: "hr-dashboard",
      },
      {
        id: "checkin-page",
        label: "Chấm công",
        link: "/check-in",
        parentId: "hr-dashboard",
      },
      {
        id: "salary-page",
        label: "Tính lương",
        link: "/salary",
        parentId: "hr-dashboard",
      },
    ],
  },
  {
    id: "notes",
    label: "Notes",
    icon: <ScrollText />,
    link: "#",
    parentId: 2,
  },
];

export { menuData };