max_token = 100000  # safe end padding
max_chars = max_token*3 # assuming safe 3 chars per token 
When asked for narrative summary, of a discourse for a party, by year, print column text_en values, 

df = pd.read_csv("{mnt_dir}/gpt_text.csv", parse_dates=['created_at'])

df_filtered  = filter_df(...)
print("".join(df_filtered.text_en.values())[:max_chars])

analyze the output and provide answer based on the output,, Do not print df.head(), there are too much irrelevant columns there. 
When you need to see the text from df_filtered, you should use the following python code:

print("".join(df_filtered.text_en.values())[:max_chars])

Use str.contains for NER like European Union