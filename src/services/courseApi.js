const API_BASE_URL = "http://localhost:5000/api";

const tokensByRole = {};

export async function getAuthToken(role = 'TRAINER') {
  if (tokensByRole[role]) {
    return tokensByRole[role];
  }

  const credentials =
    role === 'TRAINER'
      ? { email: 'trainer@test.com', password: 'trainer123' }
      : { email: 'learner@test.com', password: 'learner123' };

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (data.success && data.data?.token) {
      tokensByRole[role] = data.data.token;
      return tokensByRole[role];
    }
  } catch (err) {
    console.error(`Failed to authenticate as ${role}:`, err);
  }

  return null;
}

export async function fetchWithAuth(endpoint, options = {}, role = 'TRAINER') {
  const token = await getAuthToken(role);

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

// ----------------------------------------------------
// COURSES READ
// ----------------------------------------------------
export async function getCourses(role = 'TRAINER') {
  const response = await fetchWithAuth('/courses', {}, role);
  return response.data || [];
}

export async function getCourseById(courseId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/courses/${courseId}`, {}, role);
  return response.data;
}

export async function getModulesByCourse(courseId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/modules/course/${courseId}`, {}, role);
  return response.data || [];
}

export async function getUnitsByCourse(courseId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/units/course/${courseId}`, {}, role);
  return response.units || response.data || [];
}

export async function getTopicsByUnit(unitId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/topics/unit/${unitId}`, {}, role);
  return response.topics || response.data || [];
}

// ----------------------------------------------------
// COURSE CRUD
// ----------------------------------------------------
export async function createCourse(courseData, role = 'TRAINER') {
  const response = await fetchWithAuth('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  }, role);
  return response.data;
}

export async function updateCourse(courseId, updates, role = 'TRAINER') {
  const response = await fetchWithAuth(`/courses/${courseId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, role);
  return response.data;
}

export async function deleteCourse(courseId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/courses/${courseId}`, {
    method: 'DELETE',
  }, role);
  return response;
}

// ----------------------------------------------------
// UNIT CRUD
// ----------------------------------------------------
export async function createUnit(unitData, role = 'TRAINER') {
  const response = await fetchWithAuth('/units', {
    method: 'POST',
    body: JSON.stringify(unitData),
  }, role);
  return response.unit || response.data;
}

export async function updateUnit(unitId, updates, role = 'TRAINER') {
  const response = await fetchWithAuth(`/units/${unitId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, role);
  return response.unit || response.data;
}

export async function deleteUnit(unitId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/units/${unitId}`, {
    method: 'DELETE',
  }, role);
  return response.unit || response.data;
}

// ----------------------------------------------------
// TOPIC CRUD
// ----------------------------------------------------
export async function createTopic(topicData, role = 'TRAINER') {
  const response = await fetchWithAuth('/topics', {
    method: 'POST',
    body: JSON.stringify(topicData),
  }, role);
  return response.topic || response.data;
}

export async function updateTopic(topicId, updates, role = 'TRAINER') {
  const response = await fetchWithAuth(`/topics/${topicId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, role);
  return response.topic || response.data;
}

export async function deleteTopic(topicId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/topics/${topicId}`, {
    method: 'DELETE',
  }, role);
  return response.topic || response.data;
}

// ----------------------------------------------------
// TOPIC MATERIAL / PDF CRUD
// ----------------------------------------------------
export async function getTopicMaterials(topicId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/topics/${topicId}/materials`, {}, role);
  return response.data || response.materials || [];
}

export async function uploadTopicMaterial(topicId, formData, role = 'TRAINER') {
  const token = await getAuthToken(role);
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/topics/${topicId}/materials`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Upload error: ${response.status}`);
  }
  return data.data || data.material;
}

export async function deleteTopicMaterial(materialId, role = 'TRAINER') {
  const response = await fetchWithAuth(`/topics/materials/${materialId}`, {
    method: 'DELETE',
  }, role);
  return response.data || response.material;
}

export default {
  getCourses,
  getCourseById,
  getModulesByCourse,
  getUnitsByCourse,
  getTopicsByUnit,
  createCourse,
  updateCourse,
  deleteCourse,
  createUnit,
  updateUnit,
  deleteUnit,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicMaterials,
  uploadTopicMaterial,
  deleteTopicMaterial,
};
