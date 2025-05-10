export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS_MESSAGE: 'SET_SUCCESS_MESSAGE',
  RESET_MESSAGES: 'RESET_MESSAGES',
  SET_PRODUCTOS: 'SET_PRODUCTOS',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_CATEGORIA_FILTRO: 'SET_CATEGORIA_FILTRO',
  SET_FORM: 'SET_FORM',
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_FORM: 'RESET_FORM',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  SET_FIELD_ERROR: 'SET_FIELD_ERROR',
  CLEAR_FIELD_ERROR: 'CLEAR_FIELD_ERROR',
  SET_PREVIEW_IMAGE: 'SET_PREVIEW_IMAGE',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_EDITANDO: 'SET_EDITANDO',
  UPDATE_PRODUCT_STATUS: 'UPDATE_PRODUCT_STATUS' // Nueva acción
}

export const initialState = {
  productos: [],
  loading: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  categoriaFiltro: '',
  modalOpen: false,
  editando: null,
  form: {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    marca: '',
    estado: 'activo',
    destacado: false,
    imagen: null
  },
  formErrors: {},
  previewImage: null
}

export const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, successMessage: null }

    case ACTIONS.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload, error: null }

    case ACTIONS.RESET_MESSAGES:
      return { ...state, error: null, successMessage: null }

    case ACTIONS.SET_PRODUCTOS:
      return { ...state, productos: action.payload }

    case ACTIONS.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }

    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }

    case ACTIONS.SET_CATEGORIA_FILTRO:
      return { ...state, categoriaFiltro: action.payload }

    case ACTIONS.SET_FORM:
      return { ...state, form: action.payload }

    case ACTIONS.UPDATE_FORM:
      return {
        ...state,
        form: { ...state.form, ...action.payload }
      }

    case ACTIONS.RESET_FORM:
      return {
        ...state,
        form: initialState.form,
        formErrors: {},
        previewImage: null,
        editando: null
      }

    case ACTIONS.SET_FORM_ERRORS:
      return { ...state, formErrors: action.payload }

    case ACTIONS.SET_FIELD_ERROR:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.field]: action.payload.error
        }
      }

    case ACTIONS.CLEAR_FIELD_ERROR:
      const updatedErrors = { ...state.formErrors }
      delete updatedErrors[action.payload]
      return {
        ...state,
        formErrors: updatedErrors
      }

    case ACTIONS.SET_PREVIEW_IMAGE:
      return { ...state, previewImage: action.payload }

    case ACTIONS.SET_MODAL_OPEN:
      return { ...state, modalOpen: action.payload }

    case ACTIONS.SET_EDITANDO:
      return { ...state, editando: action.payload }

    case ACTIONS.UPDATE_PRODUCT_STATUS:
      return {
        ...state,
        productos: state.productos.map((producto) =>
          producto._id === action.payload.id
            ? { ...producto, estado: action.payload.estado }
            : producto
        ),
        successMessage: `Estado del producto ${
          action.payload.estado === 'activo' ? 'activado' : 'desactivado'
        } correctamente`
      }

    default:
      return state
  }
}
