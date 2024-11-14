'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SortAsc, SortDesc } from 'lucide-react'
import Image from 'next/image'

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

// Data
const countries: Country[] = [
  { name: "United States", flag: "/placeholder.svg?height=40&width=60", capital: "Washington, D.C.", population: 331002651, currency: "USD", languages: ["English"], continent: "North America", area: 9833517, gdp: 21433225, independent: true },
  { name: "Japan", flag: "/placeholder.svg?height=40&width=60", capital: "Tokyo", population: 126476461, currency: "JPY", languages: ["Japanese"], continent: "Asia", area: 377975, gdp: 5082465, independent: true },
  { name: "France", flag: "/placeholder.svg?height=40&width=60", capital: "Paris", population: 67391582, currency: "EUR", languages: ["French"], continent: "Europe", area: 551695, gdp: 2715518, independent: true },
  { name: "Brazil", flag: "/placeholder.svg?height=40&width=60", capital: "Brasília", population: 212559417, currency: "BRL", languages: ["Portuguese"], continent: "South America", area: 8515767, gdp: 1839758, independent: true },
  { name: "South Africa", flag: "/placeholder.svg?height=40&width=60", capital: "Pretoria", population: 59308690, currency: "ZAR", languages: ["Afrikaans", "English", "Zulu"], continent: "Africa", area: 1221037, gdp: 351432, independent: true },
  { name: "Australia", flag: "/placeholder.svg?height=40&width=60", capital: "Canberra", population: 25499884, currency: "AUD", languages: ["English"], continent: "Oceania", area: 7692024, gdp: 1392681, independent: true },
]

// Components
const CountryCard = ({ country }: { country: Country }) => (
  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center gap-4">
      <Image src={country.flag} alt={`${country.name} flag`} width={60} height={40} className="rounded" />
      <CardTitle>{country.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500">{country.continent}</p>
      <p className="text-sm text-gray-500">Population: {country.population.toLocaleString()}</p>
    </CardContent>
  </Card>
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
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <div className="flex-grow">
      <Input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </div>
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
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

  // Memoized filtered countries
  const filteredCountries = useMemo(() => {
    return countries
      .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
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
  }, [searchTerm, sortBy, sortOrder])

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
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name}
            country={country}
          />
        ))}
      </div>
    </div>
  )
}