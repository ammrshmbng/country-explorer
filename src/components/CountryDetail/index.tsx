'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Map, Users, Landmark, DollarSign, Languages, Award, Handshake } from 'lucide-react'
import Image from 'next/image'
import { useGetCountryDetailsQuery } from "@/lib/features/countriesSlice"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export default function AustraliaDetails() {
  const {id} = useParams()

  const {data, isLoading, isError} = useGetCountryDetailsQuery(id)

  const countryDetails = useMemo(() => {
   return data?.map((country:any)=>{
    return {
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital[0],
        population: country.population,
        currency: Object.keys(country.currencies)[0],
        languages: Object.values(country.languages),
        continent: country.continents[0],
        area: country.area,
        gdp: country.gini?.[2014] || 0,
        independent: country.independent,
        googleMaps: country.maps.googleMaps
    }
   })
  }, [data])


  const handleCooperationOffer = () => {
    // Implement cooperation offer logic here
  }

  return (
    <div className="p-4">
      {countryDetails?.map((country:any) => (
        <div key={country.name}>
          <h2 className="text-2xl font-bold mb-4">{country.name}</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src={country.flag} alt={`${country.name} flag`} width={80} height={53} className="rounded" />
                <CardTitle>{country.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="md:grid grid-cols-2 md:gap-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-gray-500" />
                  <span>Capital: {country.capital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Population: {country.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>Currency: {country.currency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-gray-500" />
                  <span>Languages: {country.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <span>Continent: {country.continent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-gray-500" />
                  <span>Area: {country.area.toLocaleString()} km²</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span>GDP: ${country.gdp.toLocaleString()} million</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span>Independent: {country.independent ? 'Yes' : 'No'}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Map className="w-5 h-5 text-gray-500" />
                  <a
                    href={country.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCooperationOffer}>
                <Handshake className="w-5 h-5 mr-2" />
                Offer Cooperation
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  )
}