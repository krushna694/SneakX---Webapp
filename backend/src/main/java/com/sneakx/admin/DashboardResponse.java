
package com.sneakx.admin;

import java.math.BigDecimal;

public record DashboardResponse(
        long totalUsers,
        long totalProducts,
        long totalOrders,
        long lowStockVariants,
        BigDecimal totalRevenue) {
}
