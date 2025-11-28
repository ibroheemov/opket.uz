export async function payFare(chatId: number, driverId: string, amount: number) {
    const res = await fetch(`https://opketme.uz/api/user/${chatId}/pay-fare`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ driverId, amount })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Payment failed");
    }

    return res.json();
}
