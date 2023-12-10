
df = pd.read_csv("../final-data//gpt.csv", index_col=None,  parse_dates=['created_at'])
df['month_year_str'] = df['created_at'].dt.to_period('M')


register_matplotlib_converters()
discourses_dict = {
    "oligarchy": ["oligarchy_AntiIvanishvili", "oligarchy_ProIvanishvili"],
    "polarisation": ["polarisation_GovGuilt", "polarisation_OpositionGuilt"],
    "august_war": ["august_war_RussianGuilt", "august_war_GeorgianGuilt"],

   ....
}

all_value_columns = list(discourses_dict.keys()) + list(chain.from_iterable(discourses_dict.values()))

def filter_df(true_columns=[], parties=[], date_range=(datetime(2020, 1, 1), datetime(2023, 12, 31))):
    df_filtered = df.copy()
    mask = df['created_at'].between(*date_range)
    if true_columns:
        mask &= df[true_columns].any(axis=1)
    df_filtered = df[mask].copy()

    if parties:
        df_filtered = df_filtered[df_filtered.party.isin(parties)]
    else:
        columns_to_sum = true_columns if len(true_columns) else all_value_columns
        df_filtered["values_sum"] = df_filtered.apply(lambda row: sum(row[col] for col in columns_to_sum), axis=1)
        total_counts_by_party = df_filtered['party'].value_counts()
        top_5_parties = total_counts_by_party.head(5).index.tolist()
        df_filtered = df_filtered[df_filtered.party.isin(top_5_parties)]

    return df_filtered



def plot_party_discourses_count(discourses, parties = []):
    df_filtered = filter_df(discourses, parties)
    discourses = discourses if len(discourses) else list(discourses_dict.keys())
    for discourse in discourses:
        df_filtered[discourse + "_sum"] = df_filtered[[discourse]].sum(axis=1)
    df_filtered['month_year'] = df_filtered['created_at'].dt.to_period('M')
    monthly_counts = df_filtered.groupby('month_year').agg({topic + "_sum": "sum" for topic in discourses}).reset_index()
    monthly_counts['month_year'] = monthly_counts['month_year'].dt.to_timestamp()
    plt.figure(figsize=(15, 8))
    for topic in discourses:
        sns.lineplot(data=monthly_counts, x='month_year', y=topic + "_sum", label=topic)

    plt.title('Monthly Counts of True Values for Each Topic')
    ...
