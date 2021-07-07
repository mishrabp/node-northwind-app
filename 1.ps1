$Header = @{
"authorization" = "Basic zygmfk3byl5bj6uxx2q34h3uwqorkgt6fsk4fcvgpqq6qdeauoea"
    }

$Parameters = @{
Method  = "POST"
Uri = "https://dev.azure.com/bpm-2021/my-devops-artifacts/_apis/build/builds?definitionId=19&api-version=6.0"
Headers = $Header
ContentType = "application/json"
}
Invoke-RestMethod @Parameters

