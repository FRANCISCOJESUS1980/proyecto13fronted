import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useMedicalInfoState } from '../hooks/useMedicalinfoState'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import SearchFilters from '../components/SearchFilters'
import UsersList from '../components/UsersList'
import UserDetails from '../components/UserDetails'
import LoadingState from '../components/LoadingState'
import ErrorMessage from '../components/ErrorMessage'
import './MedicalinfoList.css'

const MedicalInfoList = () => {
  const navigate = useNavigate()
  const {
    state: {
      loading,
      error,
      fadeIn,
      filteredUsers,
      selectedUser,
      searchTerm,
      filterType,
      isAdvancedSearch,
      bloodTypeFilter
    },
    actions: {
      fetchMedicalInfo,
      handleUserSelect,
      setSearchTerm,
      setFilterType,
      setBloodTypeFilter,
      toggleAdvancedSearch,
      clearFilters
    }
  } = useMedicalInfoState()

  useEffect(() => {
    fetchMedicalInfo()
  }, [fetchMedicalInfo])

  return (
    <div
      className={`cf-medical-info-container ${
        fadeIn ? 'cf-medical-info-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-medical-info-content'>
        <div className='cf-medical-info-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<ArrowLeft />}
          >
            Volver a Administracion
          </Button>
          <h1 className='cf-medical-info-title'>
            Información Médica de Usuarios
          </h1>
        </div>

        {error && <ErrorMessage message={error} />}

        <SearchFilters
          searchTerm={searchTerm}
          filterType={filterType}
          isAdvancedSearch={isAdvancedSearch}
          bloodTypeFilter={bloodTypeFilter}
          filteredUsers={filteredUsers}
          onSearchTermChange={setSearchTerm}
          onFilterTypeChange={setFilterType}
          onBloodTypeFilterChange={setBloodTypeFilter}
          onToggleAdvancedSearch={toggleAdvancedSearch}
          onClearFilters={clearFilters}
        />

        {loading ? (
          <LoadingState />
        ) : (
          <div className='cf-medical-info-grid'>
            <UsersList
              filteredUsers={filteredUsers}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
            />
            <UserDetails selectedUser={selectedUser} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalInfoList
