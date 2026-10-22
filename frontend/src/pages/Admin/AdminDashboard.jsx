
import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

const initialDashboard = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    lowStockVariants: 0,
    totalRevenue: 0,
};

const cards = [
    { key: "totalUsers", label: "Total Users" },
    { key: "totalProducts", label: "Total Products" },
    { key: "totalOrders", label: "Total Orders" },
    { key: "lowStockVariants", label: "Low-Stock Variants" },
];

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(initialDashboard);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const response = await adminApi.getDashboard();

                // Supports ApiResponse payloads with a "data" property.
                const data = response?.data ?? response;

                if (active) {
                    setDashboard({
                        ...initialDashboard,
                        ...data,
                    });
                }
            } catch (err) {
                if (active) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load the admin dashboard. Check your access and try again.",
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadDashboard();

        return () => {
            active = false;
        };
    }, []);

    const formatNumber = (value) =>
        Number(value ?? 0).toLocaleString("en-IN");

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(Number(value ?? 0));

    return (
        <main className="admin-dashboard">
            <header className="admin-dashboard__header">
                <div>
                    <p>ADMINISTRATION</p>
                    <h1>Dashboard</h1>
                    <span>Overview of your SneakX store</span>
                </div>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    disabled={loading}
                >
                    Refresh
                </button>
            </header>

            {error && (
                <div className="admin-dashboard__error" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <p role="status">Loading dashboard...</p>
            ) : (
                <>
                    <section
                        className="admin-dashboard__grid"
                        aria-label="Store statistics"
                    >
                        {cards.map((card) => (
                            <article
                                className="admin-dashboard__card"
                                key={card.key}
                            >
                                <h2>{card.label}</h2>
                                <p>{formatNumber(dashboard[card.key])}</p>
                            </article>
                        ))}

                        <article className="admin-dashboard__card admin-dashboard__card--revenue">
                            <h2>Recorded Revenue</h2>
                            <p>{formatCurrency(dashboard.totalRevenue)}</p>
                        </article>
                    </section>

                    <p className="admin-dashboard__note">
                        Revenue is a preliminary metric. Refunds and partial refunds
                        may not yet be deducted.
                    </p>
                </>
            )}
        </main>
    );
}

export default AdminDashboard;
