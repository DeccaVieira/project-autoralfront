import api from './api';

export async function postRegistrationProfessional(professionalData) {
  try {
    const response = await api.post(
`/professional-data`, professionalData
    );
    return response;
  } catch {
    alert('Não foi possível enviar seus dados para análise. Tente novamente mais tarde!');
  }
}