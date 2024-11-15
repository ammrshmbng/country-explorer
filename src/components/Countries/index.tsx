'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SortAsc, SortDesc } from 'lucide-react'
import Image from 'next/image'
import { useGetCountriesQuery } from '@/lib/features/countriesSlice'
import Link from "next/link";

// Types
type Country = {
  name: string
  flag: string
  capital: string
  population: number
  currency: string
  languages: string[]
  continent: string
  area: number
  gdp: number
  independent: boolean
}


// Components
const CountryCard = ({ country }: { country: Country }) => (
  <Link href={`/country-details/${country.name}`}>
    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image src={country.flag} alt={`${country.name} flag`} width={60} height={40} className="rounded" />
        <CardTitle>{country.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{country.continent}</p>
        <p className="text-sm text-gray-500">Population: {country.population.toLocaleString()}</p>
      </CardContent>
    </Card>
  </Link>
)

const SearchSort = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}: {
  searchTerm: string
  setSearchTerm: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  sortOrder: string
  setSortOrder: (value: string) => void
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-4 ">
    <div className="flex-grow">
      <Input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full "
      />
    </div>
    
    <Select value={sortBy} onValueChange={setSortBy}  >
      <SelectTrigger className="md:w-[180px] w-full">
        <SelectValue placeholder="Sort by " />
      </SelectTrigger>
      <SelectContent  >
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="population">Population</SelectItem>
        <SelectItem value="area">Area</SelectItem>
        <SelectItem value="gdp">GDP</SelectItem>
      </SelectContent>
    </Select>
    
    <Button
      variant="outline"
      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      
    >
      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
    </Button>
  </div>
)

// Main Component
export default function CountryExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  const { data:countries, isLoading, isError } = useGetCountriesQuery('countries')
  

  // Memoized filtered countries
  const filteredCountries = useMemo(() => {
    return countries?.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.png,
      capital: country.capital,
      population: country.population,
      continent: country.continents
    })).slice(0, 10)
      .filter((country: any) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a: any, b: any) => {
        const aValue = a[sortBy as keyof Country]
        const bValue = b[sortBy as keyof Country]
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        }
        return 0
      })
  }, [searchTerm, sortBy, sortOrder, countries])

  // console.log(filteredCountries)

  return (
    <div className="p-4  min-h-screen">
      <SearchSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries?.map((country: any) => (
          <CountryCard
            key={country.name}
            country={country}
          />
        ))}
      </div>
    </div>
  )
}