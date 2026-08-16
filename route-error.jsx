import { useRouteError, isRouteErrorResponse, useLocation } from "react-router";
import { useState } from "react";

const RouteError = () => {
    const error = useRouteError();
    const location = useLocation();
    const [showDetails, setShowDetails] = useState(false);

    const errorData = {
        status: isRouteErrorResponse(error) ? error.status : 500,
        statusText: isRouteErrorResponse(error)
            ? error.statusText
            : "Unexpected Error",
        message: error?.message || "No message provided",
        stack: error?.stack,
        path: location.pathname,
        time: new Date().toLocaleString(),
    };

    const copyError = () => {
        navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
    };

    const is404 = errorData.status === 404;

    return (
        <div dir="ltr" className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-900 via-red-950 to-black px-4">
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-white">

                {/* Glow */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600/30 rounded-full blur-3xl" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center">
                        {is404 ? "🔍" : "⚠️"}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            {is404 ? "Page Not Found" : `Error ${errorData.status}`}
                        </h1>
                        <p className="text-red-300">{errorData.statusText}</p>
                    </div>
                </div>

                {/* Message */}
                <p className="text-lg text-zinc-200 mb-6">
                    {is404 
                        ? "The page you're looking for doesn't exist or has been moved."
                        : errorData.message
                    }
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                    <Info label="Route" value={errorData.path} />
                    <Info label="Time" value={errorData.time} />
                    <Info label="Environment" value={import.meta.env.MODE} />
                    <Info label="User Agent" value={navigator.userAgent} />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-4">
                    <Button onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                    <Button onClick={() => window.history.back()} variant="secondary">
                        Go Back
                    </Button>
                    <Button onClick={() => (window.location.href = "/")} variant="ghost">
                        Home
                    </Button>
                    <Button onClick={copyError} variant="outline">
                        Copy Error
                    </Button>
                </div>

                {/* Technical Details */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm text-red-300 hover:underline"
                >
                    {showDetails ? "Hide" : "Show"} technical details
                </button>

                {showDetails && (
                    <pre className="mt-4 max-h-64 overflow-auto rounded-xl bg-black/50 p-4 text-xs text-red-200">
                        {JSON.stringify(errorData, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default RouteError;

/* -------------------------------- */

const Info = ({ label, value }) => (
    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
        <p className="text-zinc-400">{label}</p>
        <p className="break-all">{value}</p>
    </div>
);

const Button = ({
    children,
    onClick,
    variant = "primary",
}) => {
    const base = "px-4 py-2 rounded-xl text-sm font-semibold transition-all";
    const styles = {
        primary: "bg-red-600 hover:bg-red-700",
        secondary: "bg-zinc-700 hover:bg-zinc-600",
        ghost: "bg-transparent hover:bg-white/10",
        outline:
            "border border-red-500 text-red-300 hover:bg-red-500/10",
    };

    return (
        <button onClick={onClick} className={`${base} ${styles[variant]}`}>
            {children}
        </button>
    );
};
