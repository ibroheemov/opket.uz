// src/types/route.ts
// src/types/route.ts
import type { ReactNode } from "react";

export interface AppRoute {
    path: string;
    element: ReactNode;
    children?: AppRoute[];
    isProtected?: boolean;
}
