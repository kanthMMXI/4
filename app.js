async function startTranslation() {
    const textToTranslate = document.getElementById('text-to-translate').value;
    const sourceLang = 'it';  // Italian (Source Language)
    const targetLang = document.getElementById('target-lang').value;

    if (!textToTranslate.trim()) {
        alert("Please enter text in Italian.");
        return;
    }

    const apiKey = 'AIzaSyD4HjBVAbKAWC5wf98ay1b6iveuolmmDCc';  // Replace with your actual API key
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: textToTranslate,
                source: sourceLang,
                target: targetLang,
            }),
        });

        if (!response.ok) {
            console.log("API response error:", response);
            alert("Error: " + response.statusText);
            return;
        }

        const data = await response.json();
        if (data && data.data && data.data.translations) {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('translation-result').textContent = `Translation: ${translatedText}`;
        } else {
            alert("Error in translation.");
        }
    } catch (error) {
        console.log("Error during fetch:", error);
        alert("An error occurred. Please try again later.");
    }
}
