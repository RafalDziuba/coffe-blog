import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email;

    if (!email) {
      return new Response(
        JSON.stringify({
          message: 'Email jest wymagany.',
        }),
        { status: 400 }
      );
    }

    const API_KEY = process.env.MAILER_LITE_API_KEY;

    if (!API_KEY) {
      console.error('Brak klucza MAILER_LITE_API_KEY w zmiennych środowiskowych.');
      return new Response(
        JSON.stringify({
          message: 'Błąd konfiguracji serwera.',
        }),
        { status: 500 }
      );
    }

    // Dokumentacja MailerLite API: https://developers.mailerlite.com/docs/subscribers.html
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        status: 'active', // Możesz zmienić na 'unconfirmed', jeśli chcesz double opt-in
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({
          message: 'Zapisano pomyślnie!',
        }),
        { status: 200 }
      );
    } else {
      console.error('Błąd MailerLite:', result);
      return new Response(
        JSON.stringify({
          message: result.message || 'Wystąpił błąd podczas zapisu.',
        }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        message: 'Wystąpił błąd serwera.',
      }),
      { status: 500 }
    );
  }
};
