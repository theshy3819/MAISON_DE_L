type Payload = { name?: unknown; phone?: unknown; weddingDate?: unknown; agree?: unknown };

/**
 * 상담 신청 접수.
 * TODO: 실제 수신 채널(이메일, 카카오 알림톡, 구글 시트, CRM 등)에 연결하세요.
 * RESERVATION_WEBHOOK_URL 이 설정돼 있으면 그 주소로 JSON 을 그대로 전달합니다.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 20) : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const weddingDate = typeof body.weddingDate === "string" ? body.weddingDate : "";

  if (!name || !/^01\d-\d{3,4}-\d{4}$/.test(phone) || !/^\d{4}-\d{2}-\d{2}$/.test(weddingDate) || body.agree !== true) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const entry = { name, phone, weddingDate, receivedAt: new Date().toISOString() };
  const webhook = process.env.RESERVATION_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!res.ok) return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  } else {
    console.info("[reservation]", entry);
  }

  return Response.json({ ok: true });
}
