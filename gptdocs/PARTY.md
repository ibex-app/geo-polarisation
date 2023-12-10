
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