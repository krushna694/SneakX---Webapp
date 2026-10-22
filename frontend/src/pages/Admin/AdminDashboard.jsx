
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Boxes,
    ChevronDown,
    CircleHelp,
    Clock3,
    Command,
    CreditCard,
    LayoutDashboard,
    Menu,
    Package,
    RefreshCw,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Users,
    Wallet,
    X,
    Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import adminApi from "../../api/adminApi";
import "./AdminDashboard.css";

const initialDashboard = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    lowStockVariants: 0,
    totalRevenue: 0,
};

const navigation = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { label: "Customers", icon: Users, path: "/admin/users" },
    { label: "Inventory", icon: Boxes, path: "/admin/inventory" },
];

const formatNumber = (value) =>
    Number(value ?? 0).toLocaleString("en-IN");

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(value ?? 0));

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(initialDashboard);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await adminApi.getDashboard();
            const data = response?.data?.data ?? response?.data ?? response;

            setDashboard({
                ...initialDashboard,
                ...(data && typeof data === "object" ? data : {}),
            });

            setLastUpdated(new Date());
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load dashboard data. Check your access and try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function fetchDashboard() {
            try {
                const response = await adminApi.getDashboard();
                const data = response?.data?.data ?? response?.data ?? response;

                if (!cancelled) {
                    setDashboard({
                        ...initialDashboard,
                        ...(data && typeof data === "object" ? data : {}),
                    });
                    setLastUpdated(new Date());
                    setError("");
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load dashboard data. Check your access and try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchDashboard();

        return () => {
            cancelled = true;
        };
    }, []);

    const metrics = [
        {
            key: "totalRevenue",
            title: "Recorded revenue",
            value: formatCurrency(dashboard.totalRevenue),
            icon: Wallet,
            description: "Revenue recorded by the store",
            accent: "orange",
        },
        {
            key: "totalOrders",
            title: "Total orders",
            value: formatNumber(dashboard.totalOrders),
            icon: ShoppingBag,
            description: "Orders recorded in the system",
            accent: "violet",
        },
        {
            key: "totalProducts",
            title: "Total products",
            value: formatNumber(dashboard.totalProducts),
            icon: Package,
            description: "Products in your catalog",
            accent: "blue",
        },
        {
            key: "totalUsers",
            title: "Total users",
            value: formatNumber(dashboard.totalUsers),
            icon: Users,
            description: "Registered store users",
            accent: "green",
        },
    ];

    const filteredNavigation = navigation;

    return (
        <div className="sx-admin">
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.button
                        type="button"
                        className="sx-admin__backdrop"
                        aria-label="Close navigation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <aside
                className={`sx-sidebar ${sidebarOpen ? "sx-sidebar--open" : ""}`}
            >
                <div className="sx-sidebar__brand">
                    <div className="sx-brand-mark">
                        <Command size={22} strokeWidth={2.5} />
                    </div>
                    <div className="sx-brand-copy">
                        <span className="sx-brand-name">
                            Sneak<span>X</span>
                        </span>
                        <span className="sx-brand-caption">CONTROL CENTER</span>
                    </div>
                    <button
                        type="button"
                        className="sx-icon-button sx-sidebar__close d-lg-none"
                        aria-label="Close sidebar"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="sx-sidebar__section-label">WORKSPACE</div>

                <nav className="sx-sidebar__nav" aria-label="Admin navigation">
                    {filteredNavigation.map((item) => {
                        const Icon = item.icon;

                        return item.active ? (
                            <div
                                key={item.label}
                                className="sx-nav-item sx-nav-item--active"
                                aria-current="page"
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                                <span className="sx-nav-indicator" />
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                to={item.path}
                                className="sx-nav-item"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sx-sidebar__section-label sx-sidebar__section-label--second">
                    SYSTEM
                </div>

                <div className="sx-sidebar__nav">
                    <div className="sx-nav-item sx-nav-item--muted">
                        <Settings size={19} />
                        <span>Settings</span>
                        <span className="sx-coming-soon">Soon</span>
                    </div>
                    <div className="sx-nav-item sx-nav-item--muted">
                        <CircleHelp size={19} />
                        <span>Help & support</span>
                    </div>
                </div>

                <div className="sx-sidebar__bottom">
                    <div className="sx-security-card">
                        <div className="sx-security-icon">
                            <ShieldCheck size={19} />
                        </div>
                        <div>
                            <strong>Secure workspace</strong>
                            <p>Administrator access</p>
                        </div>
                        <span className="sx-status-dot" />
                    </div>

                    <div className="sx-sidebar__version">
                        <span> SNEAKX ADMIN</span>
                        <span>LOCAL CONSOLE</span>
                    </div>
                </div>
            </aside>

            <div className="sx-admin__main">
                <header className="sx-topbar">
                    <div className="sx-topbar__left">
                        <button
                            type="button"
                            className="sx-icon-button d-lg-none"
                            aria-label="Open navigation"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={21} />
                        </button>
                        <div className="sx-breadcrumb">
                            <span>Workspace</span>
                            <span className="sx-breadcrumb__separator">/</span>
                            <strong>Overview</strong>
                        </div>
                    </div>

                    <div className="sx-topbar__right">
                        <div className="sx-live-indicator">
                            <span className="sx-status-dot" />
                            <span>Store overview</span>
                        </div>

                        <div className="sx-topbar__divider" />

                        <button
                            type="button"
                            className="sx-icon-button"
                            aria-label="Refresh dashboard"
                            title="Refresh dashboard"
                            onClick={loadDashboard}
                            disabled={loading}
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "sx-spin" : ""}
                            />
                        </button>

                        <div className="sx-profile">
                            <div className="sx-profile__avatar">A</div>
                            <div className="sx-profile__details">
                                <strong>Administrator</strong>
                                <span>Store owner</span>
                            </div>
                            <ChevronDown size={16} className="sx-profile__chevron" />
                        </div>
                    </div>
                </header>

                <main className="sx-content">
                    <section className="sx-welcome">
                        <div className="sx-welcome__copy">
                            <div className="sx-eyebrow">
                                <span className="sx-eyebrow__line" />
                                ADMINISTRATION
                            </div>
                            <h1>
                                Store <span>overview.</span>
                            </h1>
                            <p>
                                Your business at a glance. Monitor your store,
                                products, orders and customers.
                            </p>

                            <div className="sx-welcome__meta">
                                <span className="sx-meta-item">
                                    <Activity size={15} />
                                    Dashboard analytics
                                </span>
                                {lastUpdated && (
                                    <span className="sx-meta-item">
                                        <Clock3 size={15} />
                                        Updated{" "}
                                        {lastUpdated.toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="sx-welcome__actions">
                            <button
                                type="button"
                                className="sx-button sx-button--secondary"
                                onClick={loadDashboard}
                                disabled={loading}
                            >
                                <RefreshCw
                                    size={16}
                                    className={loading ? "sx-spin" : ""}
                                />
                                Refresh data
                            </button>
                        </div>
                        <div className="sx-welcome__orb" aria-hidden="true" />
                    </section>

                    {error && (
                        <div className="sx-alert" role="alert">
                            <div className="sx-alert__icon">
                                <Zap size={19} />
                            </div>
                            <div className="sx-alert__content">
                                <strong>Dashboard data unavailable</strong>
                                <p>{error}</p>
                            </div>
                            <button
                                type="button"
                                className="sx-button sx-button--secondary"
                                onClick={loadDashboard}
                                disabled={loading}
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    <section className="sx-section">
                        <div className="sx-section__heading">
                            <div>
                                <div className="sx-eyebrow">PERFORMANCE</div>
                                <h2>Key metrics</h2>
                                <p>A real-time snapshot of your store data.</p>
                            </div>
                            <span className="sx-section__badge">
                                <Activity size={14} />
                                {loading ? "Updating" : "Current totals"}
                            </span>
                        </div>

                        <div className="row g-3 sx-metrics">
                            {metrics.map((metric, index) => {
                                const Icon = metric.icon;

                                return (
                                    <div
                                        className="col-12 col-sm-6 col-xxl-3"
                                        key={metric.key}
                                    >
                                        <motion.article
                                            className={`sx-metric sx-metric--${metric.accent}`}
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: index * 0.07,
                                            }}
                                            whileHover={{ y: -4 }}
                                        >
                                            <div className="sx-metric__top">
                                                <div className="sx-metric__icon">
                                                    <Icon size={21} />
                                                </div>
                                                <span className="sx-metric__live">
                                                    <span className="sx-status-dot" />
                                                    LIVE DATA
                                                </span>
                                            </div>

                                            <p className="sx-metric__label">
                                                {metric.title}
                                            </p>

                                            <div className="sx-metric__value">
                                                {loading ? (
                                                    <span className="sx-skeleton sx-skeleton--value" />
                                                ) : (
                                                    metric.value
                                                )}
                                            </div>

                                            <div className="sx-metric__footer">
                                                <span>{metric.description}</span>
                                                <span className="sx-metric__arrow">
                                                    <ArrowUpRight size={17} />
                                                </span>
                                            </div>
                                        </motion.article>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="sx-lower-grid">
                        <article className="sx-panel sx-inventory-panel">
                            <div className="sx-panel__header">
                                <div className="sx-panel__title-icon sx-panel__title-icon--orange">
                                    <Boxes size={20} />
                                </div>
                                <div className="sx-panel__heading">
                                    <h3>Inventory health</h3>
                                    <p>Stock levels that need attention.</p>
                                </div>
                            </div>

                            <div className="sx-inventory-count">
                                <div>
                                    <span className="sx-inventory-count__label">
                                        Low-stock variants
                                    </span>
                                    <div className="sx-inventory-count__value">
                                        {loading ? (
                                            <span className="sx-skeleton sx-skeleton--value" />
                                        ) : (
                                            formatNumber(dashboard.lowStockVariants)
                                        )}
                                    </div>
                                </div>
                                <div className="sx-inventory-count__icon">
                                    <Package size={26} />
                                </div>
                            </div>

                            <div className="sx-inventory-bar">
                                <span
                                    style={{
                                        width:
                                            Number(dashboard.lowStockVariants) > 0
                                                ? "100%"
                                                : "0%",
                                    }}
                                />
                            </div>

                            <div className="sx-inventory-status">
                                {Number(dashboard.lowStockVariants) > 0 ? (
                                    <>
                                        <span className="sx-stock-warning">
                                            <ArrowDownRight size={15} />
                                            Attention required
                                        </span>
                                        <span>
                                            Review low-stock variants.
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="sx-stock-good">
                                            <ShieldCheck size={15} />
                                            No low-stock alerts
                                        </span>
                                        <span>
                                            No variants are currently flagged.
                                        </span>
                                    </>
                                )}
                            </div>

                            <Link
                                to="/admin/inventory"
                                className="sx-panel__link"
                            >
                                Review inventory <ArrowUpRight size={16} />
                            </Link>
                        </article>

                        <article className="sx-panel sx-revenue-panel">
                            <div className="sx-panel__header">
                                <div className="sx-panel__title-icon sx-panel__title-icon--green">
                                    <CreditCard size={20} />
                                </div>
                                <div className="sx-panel__heading">
                                    <h3>Revenue summary</h3>
                                    <p>Recorded revenue from your store.</p>
                                </div>
                            </div>

                            <div className="sx-revenue-value">
                                {loading ? (
                                    <span className="sx-skeleton sx-skeleton--value" />
                                ) : (
                                    formatCurrency(dashboard.totalRevenue)
                                )}
                            </div>

                            <div className="sx-revenue-note">
                                <span className="sx-revenue-note__icon">
                                    <Activity size={17} />
                                </span>
                                <div>
                                    <strong>Recorded total</strong>
                                    <p>
                                        This is a preliminary metric. Refunds and
                                        partial refunds may not yet be deducted.
                                    </p>
                                </div>
                            </div>

                            <div className="sx-revenue-footer">
                                <span>Store financial overview</span>
                                <Wallet size={17} />
                            </div>
                        </article>
                    </section>

                    <section className="sx-panel sx-quick-panel">
                        <div className="sx-section__heading sx-section__heading--compact">
                            <div>
                                <div className="sx-eyebrow">SHORTCUTS</div>
                                <h2>Quick access</h2>
                                <p>Jump to a store management section.</p>
                            </div>
                        </div>

                        <div className="sx-quick-grid">
                            {[
                                {
                                    label: "Manage products",
                                    detail: "Catalog and product listings",
                                    icon: Package,
                                    path: "/admin/products",
                                    accent: "orange",
                                },
                                {
                                    label: "Manage orders",
                                    detail: "Orders and order status",
                                    icon: ShoppingBag,
                                    path: "/admin/orders",
                                    accent: "violet",
                                },
                                {
                                    label: "Manage customers",
                                    detail: "Registered user accounts",
                                    icon: Users,
                                    path: "/admin/users",
                                    accent: "blue",
                                },
                                {
                                    label: "Inventory",
                                    detail: "Stock and variants",
                                    icon: Boxes,
                                    path: "/admin/inventory",
                                    accent: "green",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        to={item.path}
                                        className="sx-quick-link"
                                        key={item.label}
                                    >
                                        <div
                                            className={`sx-quick-link__icon sx-quick-link__icon--${item.accent}`}
                                        >
                                            <Icon size={20} />
                                        </div>
                                        <div className="sx-quick-link__copy">
                                            <strong>{item.label}</strong>
                                            <span>{item.detail}</span>
                                        </div>
                                        <ArrowUpRight
                                            size={17}
                                            className="sx-quick-link__arrow"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    <footer className="sx-footer">
                        <span>
                            <ShieldCheck size={15} />
                            SneakX Administration
                        </span>
                        <span>Store metrics reflect data returned by the backend.</span>
                    </footer>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
