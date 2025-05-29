export const BLOOD_TYPE_OPTIONS = [
  { value: '', label: 'Seleccionar...' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' }
]

export const INITIAL_MEDICAL_INFO = {
  bloodType: '',
  allergies: '',
  conditions: '',
  medications: '',
  emergencyContact: '',
  emergencyPhone: '',
  lastCheckup: '',
  doctorName: '',
  doctorPhone: ''
}

export const REQUIRED_FIELDS = [
  'bloodType',
  'emergencyContact',
  'emergencyPhone'
]

export const FORM_SECTIONS = {
  basic: {
    title: 'Información Básica',
    icon: 'cf-medico-basic-icon',
    fields: ['bloodType', 'lastCheckup']
  },
  conditions: {
    title: 'Condiciones Médicas',
    icon: 'cf-medico-conditions-icon',
    fields: ['allergies', 'conditions', 'medications']
  },
  emergency: {
    title: 'Contactos de Emergencia',
    icon: 'cf-medico-emergency-icon',
    fields: ['emergencyContact', 'emergencyPhone', 'doctorName', 'doctorPhone']
  }
}

export const FIELD_CONFIG = {
  bloodType: {
    label: 'Tipo de Sangre',
    type: 'select',
    icon: 'cf-medico-blood-icon',
    options: BLOOD_TYPE_OPTIONS
  },
  lastCheckup: {
    label: 'Último Chequeo Médico',
    type: 'date',
    icon: 'cf-medico-calendar-icon'
  },
  allergies: {
    label: 'Alergias',
    type: 'textarea',
    icon: 'cf-medico-allergy-icon',
    placeholder: 'Lista tus alergias...',
    fullWidth: true
  },
  conditions: {
    label: 'Condiciones Médicas',
    type: 'textarea',
    icon: 'cf-medico-medical-icon',
    placeholder: 'Lista cualquier condición médica relevante...',
    fullWidth: true
  },
  medications: {
    label: 'Medicamentos',
    type: 'textarea',
    icon: 'cf-medico-pill-icon',
    placeholder: 'Lista los medicamentos que tomas regularmente...',
    fullWidth: true
  },
  emergencyContact: {
    label: 'Nombre del Contacto',
    type: 'text',
    icon: 'cf-medico-contact-icon',
    placeholder: 'Nombre completo'
  },
  emergencyPhone: {
    label: 'Teléfono de Emergencia',
    type: 'tel',
    icon: 'cf-medico-phone-icon',
    placeholder: 'Número de teléfono'
  },
  doctorName: {
    label: 'Médico de Cabecera',
    type: 'text',
    icon: 'cf-medico-doctor-icon',
    placeholder: 'Nombre del médico'
  },
  doctorPhone: {
    label: 'Teléfono del Médico',
    type: 'tel',
    icon: 'cf-medico-phone-icon',
    placeholder: 'Número de teléfono'
  }
}
