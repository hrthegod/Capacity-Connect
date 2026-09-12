const API_BASE_URL = "http://localhost:5000/api";

let authToken =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("capacityConnectAuthToken")
    : null;

/**
 * Ensure we have a valid auth token for API calls.
 * Authenticates as default test learner if no token is stored.
 */
export async function getAuthToken() {
  if (authToken) {
    return authToken;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "learner@test.com",
        password: "learner123",
      }),
    });

    const data = await res.json();

    if (data.success && data.data?.token) {
      authToken = data.data.token;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("capacityConnectAuthToken", authToken);
      }
      return authToken;
    }
  } catch (err) {
    console.error("Failed to authenticate learner:", err);
  }

  return null;
}

/**
 * Make an authenticated API request to backend.
 */
async function fetchWithAuth(endpoint, options = {}) {
  const token = await getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API error: ${response.status}`);
  }

  return data;
}

export async function getQuiz(quizId) {
  const response = await fetchWithAuth(`/quizzes/${quizId}`);
  return response.data;
}

export async function getQuizQuestions(quizId) {
  const response = await fetchWithAuth(`/quizzes/${quizId}/questions`);
  return response.data || [];
}

export async function startQuiz(quizId) {
  const response = await fetchWithAuth(`/quizzes/${quizId}/start`, {
    method: "POST",
  });
  return response.data;
}

export async function submitQuiz(attemptId, answers) {
  const response = await fetchWithAuth(`/quizzes/attempts/${attemptId}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
  return response.data;
}

export async function getQuizResult(attemptId) {
  const response = await fetchWithAuth(`/quizzes/attempts/${attemptId}/result`);
  return response.data;
}
